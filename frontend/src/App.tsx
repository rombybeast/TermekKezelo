import { useEffect, useState } from "react";
import * as RadioGroup from '@radix-ui/react-radio-group';
import * as Switch from '@radix-ui/react-switch';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Termek {
  id: number;
  nev: string;
  ar: number;
  raktariDarabszam: number;
  szin: string;
  ertekeles: number;
  kiadasEve: number;
  publikalt: boolean;
}

const API_URL = "http://localhost:3000/termek";

export default function App() {
  const [termekek, setTermekek] = useState<Termek[]>([]);
  const [statusMessage, setStatusMessage] = useState<{ text: string, type: 'success' | 'danger' | null }>({ text: '', type: null });
  
  const [formData, setFormData] = useState({
    nev: "", 
    ar: 0, 
    raktariDarabszam: 0, 
    szin: "Fekete", 
    ertekeles: 0, 
    kiadasEve: 2026, 
    publikalt: false
  });

  useEffect(() => { 
    loadData(); 
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTermekek(data);
    } catch { 
      setStatusMessage({ text: "Hiba: Nem sikerült elérni a szervert!", type: 'danger' });
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.ertekeles < 0 || formData.ertekeles > 10) {
      setStatusMessage({ text: "Az értékelésnek 0 és 10 között kell lennie!", type: 'danger' });
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatusMessage({ text: "Termék sikeresen hozzáadva!", type: 'success' });
        loadData();
        setTimeout(() => setStatusMessage({ text: '', type: null }), 3000);
      } else {
        setStatusMessage({ text: "Hiba történt a mentés során!", type: 'danger' });
      }
    } catch {
      setStatusMessage({ text: "Hálózati hiba!", type: 'danger' });
    }
  };

  const handleAction = async (id: number, action: string) => {
    await fetch(`${API_URL}/${id}/${action}`, { method: "PATCH" });
    loadData();
  };

  const updateField = async (id: number, field: string, value: any) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value })
    });
    loadData();
  };

  const deleteTermek = async (id: number) => {
    if (confirm("Biztosan törlöd ezt a terméket?")) {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      loadData();
    }
  };

  return (
    <div className="container py-5" style={{ backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 className="text-center mb-5 fw-bold text-primary">Termékkezelő</h1>

      <section className="card shadow-sm p-4 mb-5 border-0 rounded-4">
        <h2 className="h4 mb-4">Új termék felvétele</h2>
        
        {statusMessage.text && (
          <div className={`alert alert-${statusMessage.type} alert-dismissible fade show`} role="alert">
            {statusMessage.text}
          </div>
        )}

        <form onSubmit={handleCreate} className="row g-3">
          <div className="col-md-3">
            <label className="form-label fw-bold">Név</label>
            <input type="text" className="form-control" required onChange={e => setFormData({...formData, nev: e.target.value})} />
          </div>
          <div className="col-md-2">
            <label className="form-label fw-bold">Ár (Ft)</label>
            <input type="number" className="form-control" required onChange={e => setFormData({...formData, ar: +e.target.value})} />
          </div>
          <div className="col-md-2">
            <label className="form-label fw-bold">Raktár (db)</label>
            <input type="number" className="form-control" required onChange={e => setFormData({...formData, raktariDarabszam: +e.target.value})} />
          </div>
          <div className="col-md-2">
            <label className="form-label fw-bold">Év</label>
            <input type="number" className="form-control" defaultValue={2026} onChange={e => setFormData({...formData, kiadasEve: +e.target.value})} />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-success w-100 fw-bold shadow-sm">Mentés</button>
          </div>
        </form>
      </section>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {termekek.map(t => (
          <div key={t.id} className="col">
            <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-4">
                <h3 className="h5 card-title mb-3 fw-bold text-dark">{t.nev}</h3>
                <div className="mb-3">
                  <span className="badge bg-light text-dark border me-2">{t.ar} Ft</span>
                  <span className="badge bg-info text-dark">Készlet: {t.raktariDarabszam} db</span>
                </div>
                
                <div className="mb-4">
                  <span className="small d-block mb-2 fw-semibold text-secondary">⭐ Értékelés: {t.ertekeles}/10</span>
                  <ToggleGroup.Root
                    type="single"
                    className="d-flex flex-wrap gap-1"
                    value={t.ertekeles.toString()}
                    onValueChange={(val) => { if (val) updateField(t.id, 'ertekeles', parseInt(val)); }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <ToggleGroup.Item
                        key={num}
                        value={num.toString()}
                        style={{
                          width: '26px', height: '26px', borderRadius: '6px', border: '1px solid #ddd',
                          backgroundColor: t.ertekeles >= num ? '#ffc107' : '#fff',
                          fontSize: '11px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                          cursor: 'pointer', fontWeight: 'bold'
                        }}
                      >
                        {num}
                      </ToggleGroup.Item>
                    ))}
                  </ToggleGroup.Root>
                </div>

                <div className="mb-4">
                  <span className="small d-block mb-2 fw-semibold text-secondary">Szín módosítása:</span>
                  <RadioGroup.Root 
                    className="d-flex gap-2"
                    value={t.szin} 
                    onValueChange={(val) => updateField(t.id, 'szin', val)}
                  >
                    {['Piros', 'Kék', 'Zöld', 'Fekete', 'Fehér'].map(color => (
                      <div key={color} className="d-flex flex-column align-items-center">
                        <RadioGroup.Item 
                          value={color} 
                          style={{ 
                            width: '24px', height: '24px', borderRadius: '50%', 
                            border: '2px solid #dee2e6', 
                            backgroundColor: color === 'Fehér' ? '#fff' : color === 'Piros' ? '#dc3545' : color === 'Kék' ? '#0d6efd' : color === 'Zöld' ? '#198754' : '#212529',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                          }}
                        >
                          <RadioGroup.Indicator 
                            style={{ 
                              display: 'block', width: '10px', height: '10px', borderRadius: '50%', 
                              backgroundColor: (color === 'Fekete' || color === 'Kék') ? '#fff' : '#000' 
                            }} 
                          />
                        </RadioGroup.Item>
                        <span style={{ fontSize: '9px', marginTop: '4px' }}>{color}</span>
                      </div>
                    ))}
                  </RadioGroup.Root>
                </div>

                <div className="d-flex align-items-center gap-3 mb-4 p-2 bg-light rounded-3">
                  <span className="small fw-semibold">Publikálva:</span>
                  <Switch.Root 
                    checked={t.publikalt}
                    onCheckedChange={() => handleAction(t.id, t.publikalt ? "unpublish" : "publish")}
                    style={{ width: '42px', height: '24px', backgroundColor: t.publikalt ? '#198754' : '#ced4da', borderRadius: '12px', position: 'relative', border: 'none', cursor: 'pointer' }}
                  >
                    <Switch.Thumb style={{ display: 'block', width: '18px', height: '18px', backgroundColor: 'white', borderRadius: '50%', transition: 'transform 100ms', transform: t.publikalt ? 'translateX(21px)' : 'translateX(3px)' }} />
                  </Switch.Root>
                </div>

                <div className="d-flex justify-content-between align-items-center pt-3 border-top">
                  <div className="btn-group shadow-sm">
                    <button className="btn btn-outline-primary btn-sm px-3" onClick={() => handleAction(t.id, "increment")}>+</button>
                    <button className="btn btn-outline-primary btn-sm px-3" onClick={() => handleAction(t.id, "decrement")}>-</button>
                  </div>
                  <button className="btn btn-danger btn-sm rounded-pill px-3" onClick={() => deleteTermek(t.id)}>🗑️ Törlés</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}