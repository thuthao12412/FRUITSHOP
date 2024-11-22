import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

interface DashboardStats {
  totalRevenue: number;
  productCount: number;
  userCount: number;
  orderCount: number;
}

interface AppContextProps {
  stats: DashboardStats | null;
  fetchStats: () => Promise<void>;
}

const AppContext = createContext<AppContextProps>({
  stats: null,
  fetchStats: async () => {},
});

export const AppProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const fetchStats = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dashboard/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <AppContext.Provider value={{ stats, fetchStats }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
