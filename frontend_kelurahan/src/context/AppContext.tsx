import { createContext, useEffect, useState, type ReactNode } from "react";
import toast from "react-hot-toast";

interface warga {
  pk: number;
  id: number;
  nik: number;
  nama_lengkap: string;
  alamat: string;
  no_telepon: string;
  tanggal_registrasi: string;
}

interface AppContextType {
  wargas: warga[];
  loading: boolean;
  error: string | null;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [wargas, setWargas] = useState<warga[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/api/";

  const getDataWarga = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${backendUrl}warga/`);
      if (res.ok) {
        const data = await res.json();
        setWargas(data.results || data);
        console.log("Wargas from backend:", data);
        toast.success("Wargas loaded successfully");
      } else {
        toast.error("Failed to fetch Wargas");
      }
    } catch (err: unknown) {
      console.log(err);
      toast.error("An error occurred while fetching Wargas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataWarga();
  }, []);

  return (
    <AppContext.Provider
      value={{
        wargas,
        loading,
        error,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
