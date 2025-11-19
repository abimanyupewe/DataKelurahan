import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Warga {
  id: number;
  nama_lengkap: string;
  nik: string;
  alamat: string;
  no_telepon: string;
}

function App() {
  const [warga, setWarga] = useState<Warga[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    nama_lengkap: "",
    nik: "",
    alamat: "",
    no_telepon: "",
  });

  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://127.0.0.1:8000/api/";

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendUrl}warga/`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setWarga(Array.isArray(data) ? data : data.results || []);
      toast.success("Data warga berhasil dimuat");
    } catch (error) {
      setError("Gagal mengambil data warga");
      console.error("Error fetching data:", error);
    }
  };

  const addWarga = async (newWarga: Omit<Warga, "id">) => {
    try {
      const response = await fetch(`${backendUrl}warga/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Token 243d0864b90414d2fadbf79cd8eb220c59ee9d8a"
        },
        body: JSON.stringify(newWarga),
      });

      if (!response.ok) throw new Error("Gagal menambah data");

      const created = await response.json();

      // TAMBAHKAN DATA BARU KE STATE
      setWarga((prev) => [...prev, created]);
      toast.success("Warga berhasil ditambahkan");
    } catch (error) {
      setError("Gagal menambah warga");
      console.error(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addWarga(form);

    // Reset form
    setForm({
      nama_lengkap: "",
      nik: "",
      alamat: "",
      no_telepon: "",
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Data Warga</h1>

      {error && <p className="text-red-600">{error}</p>}

      {warga.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <div className="space-y-4">
          {warga.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg shadow-sm bg-gray-100"
            >
              <p>
                <strong>Nama:</strong> {item.nama_lengkap}
              </p>
              <p>
                <strong>NIK:</strong> {item.nik}
              </p>
              <p>
                <strong>Alamat:</strong> {item.alamat}
              </p>
              <p>
                <strong>No Telepon:</strong> {item.no_telepon}
              </p>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="mb-6 space-y-4">
        <div>
          <label className="block font-semibold">Nama Lengkap</label>
          <input
            type="text"
            name="nama_lengkap"
            value={form.nama_lengkap}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">NIK</label>
          <input
            type="text"
            name="nik"
            value={form.nik}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Alamat</label>
          <input
            type="text"
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">No Telepon</label>
          <input
            type="text"
            name="no_telepon"
            value={form.no_telepon}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah Warga
        </button>
      </form>
    </div>
  );
}

export default App;
