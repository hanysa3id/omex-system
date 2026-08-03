'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, Client, Customer, Driver, Vehicle } from '@/types';
import {
  INITIAL_ORDERS,
  INITIAL_CLIENTS,
  INITIAL_CUSTOMERS,
  INITIAL_DRIVERS,
  INITIAL_VEHICLES,
} from '@/lib/mockData';

interface DataContextType {
  orders: Order[];
  clients: Client[];
  customers: Customer[];
  drivers: Driver[];
  vehicles: Vehicle[];
  addOrder: (newOrder: Partial<Order>) => Order;
  deleteOrder: (id: string) => void;
  toggleHoldOrder: (id: string) => void;
  reverseCancelOrder: (id: string) => void;
  updateOrderStatus: (id: string, newStatus: Order['status']) => void;
  addRecordToCategory: (categoryKey: string, newRecord: any) => void;
  getCategoryRecords: (categoryKey: string, initialDefaults: any[]) => any[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const LOCAL_STORAGE_PREFIX = 'omex_system_data_v1_';

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS);
  const [drivers, setDrivers] = useState<Driver[]>(INITIAL_DRIVERS);
  const [vehicles, setVehicles] = useState<Vehicle[]>(INITIAL_VEHICLES);
  const [categoryStore, setCategoryStore] = useState<Record<string, any[]>>({});

  // Initialize from localStorage
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'orders');
      if (savedOrders) setOrders(JSON.parse(savedOrders));

      const savedClients = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'clients');
      if (savedClients) setClients(JSON.parse(savedClients));

      const savedCustomers = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'customers');
      if (savedCustomers) setCustomers(JSON.parse(savedCustomers));

      const savedDrivers = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'drivers');
      if (savedDrivers) setDrivers(JSON.parse(savedDrivers));

      const savedVehicles = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'vehicles');
      if (savedVehicles) setVehicles(JSON.parse(savedVehicles));

      const savedCategoryStore = localStorage.getItem(LOCAL_STORAGE_PREFIX + 'categories');
      if (savedCategoryStore) setCategoryStore(JSON.parse(savedCategoryStore));
    } catch (e) {
      console.warn('LocalStorage read error:', e);
    }
  }, []);

  // Save to localStorage helpers
  const saveOrders = (updated: Order[]) => {
    setOrders(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'orders', JSON.stringify(updated));
    } catch (e) {}
  };

  const addOrder = (newOrderData: Partial<Order>): Order => {
    const created: Order = {
      id: `ord-${Date.now()}`,
      voucherNo: newOrderData.voucherNo || `VCH-2026-${Math.floor(100000 + Math.random() * 900000)}`,
      refNo: newOrderData.refNo || '0',
      billNo: newOrderData.billNo || `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      clientId: newOrderData.clientId || 'cli-1',
      clientName: newOrderData.clientName || 'Emirates Global Trading',
      customerId: `cust-${Date.now()}`,
      customerName: newOrderData.customerName || 'Recipient Name',
      customerPhone: newOrderData.customerPhone || '+971 50 000 0000',
      emirate: newOrderData.emirate || 'Dubai',
      area: newOrderData.area || 'Business Bay',
      addressLine: newOrderData.addressLine || 'Dubai, UAE',
      payType: newOrderData.payType || 'COD',
      orderType: newOrderData.orderType || 'Standard',
      chargeFrom: newOrderData.chargeFrom || 'Customer',
      agentName: newOrderData.agentName || 'Main Admin',
      quantity: newOrderData.quantity || 1,
      productPrice: newOrderData.productPrice || 0,
      deliveryCharge: newOrderData.deliveryCharge || 20,
      taxAmount: newOrderData.taxAmount || 1,
      totalAmount: newOrderData.totalAmount || 21,
      codAmount: newOrderData.codAmount || 21,
      pickupDate: newOrderData.pickupDate || new Date().toISOString().slice(0, 10),
      deliveryDate: newOrderData.deliveryDate || new Date(Date.now() + 86400000).toISOString().slice(0, 10),
      status: 'Pickup Scheduled',
      notes: newOrderData.notes || '',
      createdAt: new Date().toISOString(),
      isOnHold: false,
      isCancelled: false,
      isPickup: newOrderData.isPickup || false,
      isExchange: newOrderData.isExchange || false,
      isFragile: newOrderData.isFragile || false,
    };

    const updated = [created, ...orders];
    saveOrders(updated);
    return created;
  };

  const deleteOrder = (id: string) => {
    const updated = orders.filter((o) => o.id !== id);
    saveOrders(updated);
  };

  const toggleHoldOrder = (id: string) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, isOnHold: !o.isOnHold, status: !o.isOnHold ? ('On Hold' as const) : ('Pickup Scheduled' as const) } : o
    );
    saveOrders(updated);
  };

  const reverseCancelOrder = (id: string) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, isCancelled: false, status: ('In Transit' as const) } : o
    );
    saveOrders(updated);
  };

  const updateOrderStatus = (id: string, newStatus: Order['status']) => {
    const updated = orders.map((o) => {
      if (o.id === id) {
        const isCancelled = newStatus === 'Cancelled';
        const isOnHold = newStatus === 'On Hold';
        return { ...o, status: newStatus, isCancelled, isOnHold };
      }
      return o;
    });
    saveOrders(updated);
  };

  // Generic category records
  const addRecordToCategory = (categoryKey: string, newRecord: any) => {
    const existing = categoryStore[categoryKey] || [];
    const updated = [newRecord, ...existing];
    const newStore = { ...categoryStore, [categoryKey]: updated };
    setCategoryStore(newStore);
    try {
      localStorage.setItem(LOCAL_STORAGE_PREFIX + 'categories', JSON.stringify(newStore));
    } catch (e) {}
  };

  const getCategoryRecords = (categoryKey: string, initialDefaults: any[]) => {
    const customAdded = categoryStore[categoryKey] || [];
    return [...customAdded, ...initialDefaults];
  };

  return (
    <DataContext.Provider
      value={{
        orders,
        clients,
        customers,
        drivers,
        vehicles,
        addOrder,
        deleteOrder,
        toggleHoldOrder,
        reverseCancelOrder,
        updateOrderStatus,
        addRecordToCategory,
        getCategoryRecords,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
