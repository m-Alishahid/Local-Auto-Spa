// app/services/page.tsx
"use client";
import { useEffect, useState } from "react";
import { serviceTypes, additionalServices, vehicleTypes, timeSlots, usStates } from "@/utils/services";

type SelectedService = { serviceType: string; package: string };

interface BookingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  vehicleType: string;
  vehicleLength?: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  date: string; // ISO date string
  timeSlot: string;
  notes: string;
  selectedServices: SelectedService[];
  additionalServices: string[]; // ids
  totalPrice: number;
}

export default function ServicesPage() {
  const [formData, setFormData] = useState<BookingFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    vehicleMake: "",
    vehicleModel: "",
    vehicleYear: "",
    vehicleColor: "",
    vehicleType: "",
    vehicleLength: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    date: "",
    timeSlot: "",
    notes: "",
    selectedServices: [],
    additionalServices: [],
    totalPrice: 0,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // helper: parse price like "$150" or "$25-50/ft" -> take first number
  const parsePrice = (priceStr: string | undefined) => {
    if (!priceStr) return 0;
    const m = priceStr.match(/[\d,.]+/);
    if (!m) return 0;
    return parseFloat(m[0].replace(/,/g, ""));
  };

  // compute total whenever selectedServices or additionalServices change
  useEffect(() => {
    let total = 0;
    formData.selectedServices.forEach((s) => {
      const svc = serviceTypes.find((st) => st.id === s.serviceType);
      const pkg = svc?.packages.find((p) => p.id === s.package);
      total += parsePrice(pkg?.price);
    });
    formData.additionalServices.forEach((id) => {
      const add = additionalServices.find((a) => a.id === id);
      total += parsePrice(add?.price);
    });
    setFormData((prev) => ({ ...prev, totalPrice: Math.round(total) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.selectedServices.length, formData.additionalServices.length]);

  const handlePackageChange = (serviceId: string, packageId: string) => {
    setFormData((prev) => {
      const others = prev.selectedServices.filter((s) => s.serviceType !== serviceId);
      return { ...prev, selectedServices: packageId ? [...others, { serviceType: serviceId, package: packageId }] : others };
    });
  };

  const toggleAddon = (id: string) => {
    setFormData((prev) => {
      const exists = prev.additionalServices.includes(id);
      return { ...prev, additionalServices: exists ? prev.additionalServices.filter((a) => a !== id) : [...prev.additionalServices, id] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // send date as ISO string; server will format
      const payload = { ...formData, date: formData.date ? new Date(formData.date).toISOString() : null };

      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccess(true);
      } else {
        console.error("Send error:", data);
        alert("Failed to send booking. Check console.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <div className="max-w-2xl mx-auto py-10"><p className="text-green-600">✅ Booking submitted successfully! Check your email.</p></div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Book a Service</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer */}
        <div className="grid grid-cols-2 gap-4">
          <input value={formData.firstName} onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} placeholder="First name" className="border p-2 rounded" required />
          <input value={formData.lastName} onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} placeholder="Last name" className="border p-2 rounded" required />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email" className="border p-2 rounded" required />
          <input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone" className="border p-2 rounded" required />
          <input value={formData.totalPrice} readOnly placeholder="Total" className="border p-2 rounded bg-gray-100" />
        </div>

        {/* Vehicle */}
        <div className="grid md:grid-cols-3 gap-4">
          <select value={formData.vehicleType} onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })} className="border p-2 rounded">
            <option value="">Vehicle type</option>
            {vehicleTypes.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
          </select>
          <input value={formData.vehicleMake} onChange={(e) => setFormData({ ...formData, vehicleMake: e.target.value })} placeholder="Make" className="border p-2 rounded" />
          <input value={formData.vehicleModel} onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })} placeholder="Model" className="border p-2 rounded" />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <input value={formData.vehicleYear} onChange={(e) => setFormData({ ...formData, vehicleYear: e.target.value })} placeholder="Year" className="border p-2 rounded" />
          <input value={formData.vehicleColor} onChange={(e) => setFormData({ ...formData, vehicleColor: e.target.value })} placeholder="Color" className="border p-2 rounded" />
          <input value={formData.vehicleLength} onChange={(e) => setFormData({ ...formData, vehicleLength: e.target.value })} placeholder="Length (ft) optional" className="border p-2 rounded" />
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-2">Select Service Packages</h3>
          {serviceTypes.map((svc) => (
            <div key={svc.id} className="mb-4 p-3 border rounded">
              <p className="font-medium">{svc.name}</p>
              <p className="text-sm text-gray-600">{svc.description}</p>
              <select className="mt-2 w-full border p-2 rounded" onChange={(e) => handlePackageChange(svc.id, e.target.value)} value={(formData.selectedServices.find(s => s.serviceType === svc.id)?.package) || ""}>
                <option value="">No package</option>
                {svc.packages.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.price})</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Add-ons */}
        <div>
          <h3 className="font-semibold mb-2">Add-ons</h3>
          <div className="grid md:grid-cols-2 gap-2">
            {additionalServices.map((a) => (
              <label key={a.id} className="flex items-center space-x-3 border p-2 rounded">
                <input type="checkbox" checked={formData.additionalServices.includes(a.id)} onChange={() => toggleAddon(a.id)} />
                <span>{a.name} ({a.price})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Appointment & Address */}
        <div className="grid md:grid-cols-2 gap-4">
          <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="border p-2 rounded" />
          <select value={formData.timeSlot} onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })} className="border p-2 rounded">
            <option value="">Select time</option>
            {timeSlots.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="Address" className="border p-2 rounded" />
        <div className="grid md:grid-cols-3 gap-4">
          <input value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} placeholder="City" className="border p-2 rounded" />
          <select value={formData.state} onChange={(e) => setFormData({ ...formData, state: e.target.value })} className="border p-2 rounded">
            <option value="">State</option>
            {usStates.map(s => <option key={s.abbreviation} value={s.name}>{s.name}</option>)}
          </select>
          <input value={formData.zip} onChange={(e) => setFormData({ ...formData, zip: e.target.value })} placeholder="ZIP" className="border p-2 rounded" />
        </div>

        <textarea value={formData.notes} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} placeholder="Notes" className="border p-2 rounded" />

        <div>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
            {loading ? "Sending..." : "Book Now"}
          </button>
        </div>
      </form>
    </div>
  );
}

