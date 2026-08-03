'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';
import { Camera, X, ScanLine, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (barcode: string) => void;
}

export default function BarcodeScannerModal({ isOpen, onClose, onScan }: BarcodeScannerModalProps) {
  const { lang } = useI18n();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [lastScanned, setLastScanned] = useState<string | null>(null);
  const [scanCount, setScanCount] = useState(0);
  const detectorRef = useRef<any>(null);
  const animFrameRef = useRef<number>(0);

  // Start Camera
  const startCamera = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsActive(true);

        // Try to use BarcodeDetector API if available
        if ('BarcodeDetector' in window) {
          try {
            detectorRef.current = new (window as any).BarcodeDetector({
              formats: ['code_128', 'code_39', 'ean_13', 'ean_8', 'qr_code', 'codabar'],
            });
            detectBarcode();
          } catch {
            // BarcodeDetector not supported for these formats
            detectorRef.current = null;
          }
        }
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError') {
        setError(lang === 'ar' ? 'تم رفض إذن الكاميرا. يرجى السماح بالوصول.' : 'Camera permission denied. Please allow access.');
      } else if (err.name === 'NotFoundError') {
        setError(lang === 'ar' ? 'لم يتم العثور على كاميرا.' : 'No camera found on this device.');
      } else {
        setError(lang === 'ar' ? 'خطأ في تشغيل الكاميرا.' : 'Error starting camera.');
      }
    }
  }, [lang]);

  // Detect barcode using BarcodeDetector API
  const detectBarcode = useCallback(async () => {
    if (!detectorRef.current || !videoRef.current || !isActive) return;

    try {
      const barcodes = await detectorRef.current.detect(videoRef.current);
      if (barcodes.length > 0) {
        const code = barcodes[0].rawValue;
        if (code && code !== lastScanned) {
          setLastScanned(code);
          setScanCount((c) => c + 1);
          onScan(code);
        }
      }
    } catch {
      // Detection failed, try again
    }

    animFrameRef.current = requestAnimationFrame(detectBarcode);
  }, [isActive, lastScanned, onScan]);

  // Stop Camera
  const stopCamera = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsActive(false);
    detectorRef.current = null;
  }, []);

  // Cleanup on close
  useEffect(() => {
    if (!isOpen) {
      stopCamera();
      setManualCode('');
      setError(null);
      setLastScanned(null);
      setScanCount(0);
    }
  }, [isOpen, stopCamera]);

  // Handle manual entry
  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCode.trim()) {
      setScanCount((c) => c + 1);
      setLastScanned(manualCode.trim());
      onScan(manualCode.trim());
      setManualCode('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-[#352F7A] to-[#4A3FA8] text-white">
          <div className="flex items-center gap-2.5">
            <ScanLine className="w-5 h-5 text-[#E87722]" />
            <h3 className="font-bold text-sm">
              {lang === 'ar' ? 'ماسح الباركود بالكاميرا' : 'Camera Barcode Scanner'}
            </h3>
          </div>
          <div className="flex items-center gap-2">
            {scanCount > 0 && (
              <span className="bg-[#E87722] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                {scanCount} {lang === 'ar' ? 'مسح' : 'scanned'}
              </span>
            )}
            <button
              onClick={() => {
                stopCamera();
                onClose();
              }}
              className="p-1 rounded-lg hover:bg-white/20 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Camera View */}
        <div className="p-4 space-y-4">
          {/* Camera Feed */}
          <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              playsInline
              muted
            />

            {/* Scan overlay */}
            {isActive && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-32 border-2 border-[#E87722] rounded-xl relative">
                  <div className="absolute top-0 left-0 w-5 h-5 border-t-3 border-l-3 border-[#E87722] rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-5 h-5 border-t-3 border-r-3 border-[#E87722] rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-5 h-5 border-b-3 border-l-3 border-[#E87722] rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-5 h-5 border-b-3 border-r-3 border-[#E87722] rounded-br-lg" />
                  {/* Scanning line animation */}
                  <div className="absolute inset-x-2 h-0.5 bg-[#E87722]/80 animate-pulse top-1/2" />
                </div>
              </div>
            )}

            {/* Inactive placeholder */}
            {!isActive && !error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white/70">
                <Camera className="w-12 h-12 mb-3 text-slate-400" />
                <p className="text-sm font-semibold">
                  {lang === 'ar' ? 'اضغط لتشغيل الكاميرا' : 'Click to start camera'}
                </p>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-red-900/50 p-6">
                <AlertTriangle className="w-10 h-10 mb-3 text-red-400" />
                <p className="text-sm font-semibold text-center">{error}</p>
              </div>
            )}
          </div>

          {/* Camera Controls */}
          <div className="flex items-center gap-2">
            {!isActive ? (
              <button
                onClick={startCamera}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#352F7A] hover:bg-[#231E56] text-white rounded-xl text-sm font-bold transition shadow-md active:scale-95"
              >
                <Camera className="w-4 h-4 text-[#E87722]" />
                {lang === 'ar' ? 'تشغيل الكاميرا' : 'Start Camera'}
              </button>
            ) : (
              <button
                onClick={stopCamera}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition shadow-md active:scale-95"
              >
                <X className="w-4 h-4" />
                {lang === 'ar' ? 'إيقاف الكاميرا' : 'Stop Camera'}
              </button>
            )}
          </div>

          {/* Last Scanned Result */}
          {lastScanned && (
            <div className="flex items-center gap-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-emerald-700 font-semibold">
                  {lang === 'ar' ? 'آخر باركود تم مسحه:' : 'Last scanned barcode:'}
                </p>
                <p className="text-sm font-mono font-bold text-emerald-900 truncate">{lastScanned}</p>
              </div>
              <Zap className="w-4 h-4 text-emerald-400 shrink-0" />
            </div>
          )}

          {/* Manual Entry */}
          <div className="border-t border-slate-100 pt-3">
            <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
              {lang === 'ar' ? 'أو أدخل الباركود يدوياً:' : 'Or enter barcode manually:'}
            </p>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input
                type="text"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                placeholder={lang === 'ar' ? 'أدخل رقم الباركود...' : 'Enter barcode number...'}
                className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#352F7A]/30 focus:border-[#352F7A]"
                autoFocus={!isActive}
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#E87722] hover:bg-[#D46615] text-white rounded-xl text-sm font-bold transition shadow-sm active:scale-95"
              >
                {lang === 'ar' ? 'مسح' : 'Scan'}
              </button>
            </form>
          </div>

          {/* BarcodeDetector API info */}
          {isActive && !detectorRef.current && (
            <p className="text-[10px] text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
              {lang === 'ar'
                ? '⚠ متصفحك لا يدعم القراءة التلقائية. استخدم الإدخال اليدوي أو ماسح USB.'
                : '⚠ Your browser does not support auto-detection. Use manual entry or USB scanner.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
