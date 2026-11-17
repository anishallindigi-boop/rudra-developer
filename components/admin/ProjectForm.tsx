"use client";
import React from "react";
import { ImageIcon, FileTextIcon, EyeIcon, VideoIcon, CrownIcon, PlusIcon, Trash2Icon, InfoIcon, FileIcon } from "lucide-react";
import ImagePicker from "./ImagePicker";

const inputCls = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200";

export default function ProjectForm({
  formData,
  setFormData,
  glimpses,
  setGlimpses,
  immersives,
  setImmersives,
  premiereTabs,
  setPremiereTabs,
  onSubmit,
  isEdit,
}: any) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData((prev: any) => ({ ...prev, [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value }));
  };

  const addGlimpse = () => setGlimpses((prev: any[]) => [...prev, { gimage: "", gtitle: "", gpara1: "", gpara2: "" }]);
  const removeGlimpse = (i: number) => setGlimpses((prev: any[]) => prev.filter((_, idx) => idx !== i));
  const updateGlimpseField = (i: number, field: string, value: any) => setGlimpses((prev: any[]) => prev.map((g, idx) => (idx === i ? { ...g, [field]: value } : g)));

  const addImmersive = () => setImmersives((prev: any[]) => [...prev, { immersiveTitle: "", immersiveThumbnail: "", immersiveVideoUrl: "" }]);
  const removeImmersive = (i: number) => setImmersives((prev: any[]) => prev.filter((_, idx) => idx !== i));
  const updateImmersiveField = (i: number, field: string, value: any) => setImmersives((prev: any[]) => prev.map((x, idx) => (idx === i ? { ...x, [field]: value } : x)));

  const addPremiereTab = () => setPremiereTabs((prev: any[]) => [...prev, { tabid: "", tabtitle: "", tabslides: [] }]);
  const removePremiereTab = (i: number) => setPremiereTabs((prev: any[]) => prev.filter((_, idx) => idx !== i));
  const updateTabField = (i: number, field: string, value: any) => setPremiereTabs((prev: any[]) => prev.map((t, idx) => (idx === i ? { ...t, [field]: value } : t)));
  const addSlideToTab = (ti: number) => setPremiereTabs((prev: any[]) => prev.map((t, idx) => (idx === ti ? { ...t, tabslides: [...(t.tabslides || []), { slidetitle: "", slideimage: "" }] } : t)));
  const removeSlideFromTab = (ti: number, si: number) => setPremiereTabs((prev: any[]) => prev.map((t, idx) => (idx === ti ? { ...t, tabslides: (t.tabslides || []).filter((_: any, i: number) => i !== si) } : t)));
  const updateSlideField = (ti: number, si: number, field: string, value: any) => setPremiereTabs((prev: any[]) => prev.map((t, idx) => (idx === ti ? { ...t, tabslides: (t.tabslides || []).map((s: any, i: number) => (i === si ? { ...s, [field]: value } : s)) } : t)));

  return (
    <form onSubmit={onSubmit} className="p-6 space-y-6">

      {/* Banner Section */}
      <section className="space-y-4 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
        <h2 className="text-xl font-bold flex items-center gap-2 text-indigo-800"><ImageIcon className="w-5 h-5" /> Banner Section</h2>
        <div className="grid md:grid-cols-1 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Banner Heading</label>
            <input type="text" name="bannerheading" placeholder="Enter banner heading..." value={formData.bannerheading || ""} onChange={handleChange} className={`pl-4 ${inputCls}`} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Home Banner Image</label>
            <ImagePicker label="" value={formData.homebanner || ""} onChange={(v) => setFormData((p: any) => ({ ...p, homebanner: v }))} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Banner Logo</label>
            <ImagePicker label="" value={formData.bannerlogo || ""} onChange={(v) => setFormData((p: any) => ({ ...p, bannerlogo: v }))} />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="space-y-4 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
        <h2 className="text-xl font-bold flex items-center gap-2 text-emerald-800"><InfoIcon className="w-5 h-5" /> About Section</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">About Heading</label>
            <input type="text" name="aboutheading" placeholder="Enter about heading..." value={formData.aboutheading || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Subheading</label>
            <input type="text" name="aboutsubheading" placeholder="Enter subheading..." value={formData.aboutsubheading || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Paragraph 1</label>
            <textarea name="aboutpara1" placeholder="Enter paragraph 1..." value={formData.aboutpara1 || ""} onChange={handleChange} rows={3} className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Paragraph 2</label>
            <textarea name="aboutpara2" placeholder="Enter paragraph 2..." value={formData.aboutpara2 || ""} onChange={handleChange} rows={3} className={`${inputCls} resize-none`} />
          </div>
          {["one", "two", "three", "four"].map((n) => (
            <div key={n} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">About Point {n.charAt(0).toUpperCase() + n.slice(1)}</label>
              <input type="text" name={`abountpoint${n}`} placeholder={`Enter about point ${n}...`} value={formData[`abountpoint${n}`] || ""} onChange={handleChange} className={inputCls} />
            </div>
          ))}
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">About Slide Images (comma separated URLs)</label>
            <input name="aboutslideimages" placeholder="url1, url2, ..." value={Array.isArray(formData.aboutslideimages) ? formData.aboutslideimages.join(", ") : (formData.aboutslideimages || "")} onChange={(e) => setFormData((p: any) => ({ ...p, aboutslideimages: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) }))} className={inputCls} />
          </div>
        </div>
      </section>

      {/* Glimpse Section */}
      <section className="space-y-4 bg-gradient-to-r from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 text-violet-800"><EyeIcon className="w-5 h-5" /> Glimpse Section</h2>
          <button type="button" onClick={addGlimpse} className="flex items-center gap-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition shadow-sm">
            <PlusIcon className="w-4 h-4" /> Add Glimpse
          </button>
        </div>
        <div className="space-y-4">
          {(glimpses || []).map((g: any, i: number) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-800">Glimpse {i + 1}</h3>
                <button type="button" onClick={() => removeGlimpse(i)} className="p-1 text-red-500 hover:text-red-700"><Trash2Icon className="w-4 h-4" /></button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input type="text" placeholder="Enter title..." value={g.gtitle || ""} onChange={(e) => updateGlimpseField(i, "gtitle", e.target.value)} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Image</label>
                  <ImagePicker label="" value={g.gimage || ""} onChange={(v) => updateGlimpseField(i, "gimage", v)} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Paragraph 1</label>
                  <input type="text" placeholder="Enter para 1..." value={g.gpara1 || ""} onChange={(e) => updateGlimpseField(i, "gpara1", e.target.value)} className={inputCls} />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Paragraph 2</label>
                  <input type="text" placeholder="Enter para 2..." value={g.gpara2 || ""} onChange={(e) => updateGlimpseField(i, "gpara2", e.target.value)} className={inputCls} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Immersive Tour */}
      <section className="space-y-4 bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl border border-pink-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 text-rose-800"><VideoIcon className="w-5 h-5" /> Immersive Tour</h2>
          <button type="button" onClick={addImmersive} className="flex items-center gap-1 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition shadow-sm">
            <PlusIcon className="w-4 h-4" /> Add Tour
          </button>
        </div>
        <div className="space-y-4">
          {(immersives || []).map((im: any, idx: number) => (
            <div key={idx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-800">Tour {idx + 1}</h3>
                <button type="button" onClick={() => removeImmersive(idx)} className="p-1 text-red-500 hover:text-red-700"><Trash2Icon className="w-4 h-4" /></button>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input type="text" placeholder="Enter title..." value={im.immersiveTitle || ""} onChange={(e) => updateImmersiveField(idx, "immersiveTitle", e.target.value)} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Video URL</label>
                  <input type="text" placeholder="Enter video URL..." value={im.immersiveVideoUrl || ""} onChange={(e) => updateImmersiveField(idx, "immersiveVideoUrl", e.target.value)} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Thumbnail</label>
                  <ImagePicker label="" value={im.immersiveThumbnail || ""} onChange={(v) => updateImmersiveField(idx, "immersiveThumbnail", v)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Premiere Offering */}
      <section className="space-y-4 bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-100">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2 text-amber-800"><CrownIcon className="w-5 h-5" /> Premiere Offering Tabs</h2>
          <button type="button" onClick={addPremiereTab} className="flex items-center gap-1 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition shadow-sm">
            <PlusIcon className="w-4 h-4" /> Add Tab
          </button>
        </div>
        <div className="space-y-6">
          {(premiereTabs || []).map((tab: any, tIdx: number) => (
            <div key={tIdx} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-gray-800">Tab {tIdx + 1}</h3>
                <button type="button" onClick={() => removePremiereTab(tIdx)} className="p-1 text-red-500 hover:text-red-700"><Trash2Icon className="w-4 h-4" /></button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Tab ID</label>
                  <input type="text" placeholder="Enter tab ID..." value={tab.tabid || ""} onChange={(e) => updateTabField(tIdx, "tabid", e.target.value)} className={inputCls} />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Tab Title</label>
                  <input type="text" placeholder="Enter tab title..." value={tab.tabtitle || ""} onChange={(e) => updateTabField(tIdx, "tabtitle", e.target.value)} className={inputCls} />
                </div>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-gray-700">Slides</h4>
                  <button type="button" onClick={() => addSlideToTab(tIdx)} className="flex items-center gap-1 px-3 py-1 bg-amber-500 text-white text-sm rounded hover:bg-amber-600"> <PlusIcon className="w-3 h-3" /> Add Slide</button>
                </div>
                {(tab.tabslides || []).map((slide: any, sIdx: number) => (
                  <div key={sIdx} className="bg-gray-50 p-3 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-end gap-3">
                    <div className="flex-1 space-y-2">
                      <label className="block text-xs font-medium text-gray-600">Slide Title</label>
                      <input type="text" placeholder="Enter slide title..." value={slide.slidetitle || ""} onChange={(e) => updateSlideField(tIdx, sIdx, "slidetitle", e.target.value)} className={inputCls} />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-medium text-gray-600">Slide Image</label>
                      <ImagePicker label="" value={slide.slideimage || ""} onChange={(v) => updateSlideField(tIdx, sIdx, "slideimage", v)} />
                    </div>
                    <button type="button" onClick={() => removeSlideFromTab(tIdx, sIdx)} className="p-1 text-red-500 hover:text-red-700 self-start md:self-auto"><Trash2Icon className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brochure & Connectivity */}
      <section className="space-y-4 bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
        <h2 className="text-xl font-bold flex items-center gap-2 text-teal-800"><FileTextIcon className="w-5 h-5" /> Brochure & Connectivity</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Brochure Title</label>
            <input type="text" name="brochuretitle" placeholder="Enter brochure title..." value={formData.brochuretitle || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Brochure Paragraph</label>
            <textarea name="brochurepara" placeholder="Enter brochure paragraph..." value={formData.brochurepara || ""} onChange={handleChange} rows={4} className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Brochure Image</label>
            <ImagePicker label="" value={formData.brochureimage || ""} onChange={(v) => setFormData((p: any) => ({ ...p, brochureimage: v }))} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Brochure PDF</label>
            <ImagePicker label="" value={formData.brochurepdf || ""} onChange={(v) => setFormData((p: any) => ({ ...p, brochurepdf: v }))} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Connectivity Image</label>
            <ImagePicker label="" value={formData.connectivity || ""} onChange={(v) => setFormData((p: any) => ({ ...p, connectivity: v }))} />
          </div>
        </div>
      </section>

      {/* Basic Info */}
      <section className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800"><FileIcon className="w-5 h-5" /> Basic Info</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name *</label>
            <input type="text" name="name" required value={formData.name || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Slug</label>
            <input type="text" name="slug" value={formData.slug || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Badge</label>
            <input type="text" name="badge" value={formData.badge || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input type="text" name="location" value={formData.location || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Area</label>
            <input type="text" name="area" value={formData.area || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Total Units</label>
            <input type="text" name="totalUnits" value={formData.totalUnits || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Plot Sizes</label>
            <input type="text" name="plotSizes" value={formData.plotSizes || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">RERA No.</label>
            <input type="text" name="reraNo" value={formData.reraNo || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Policy</label>
            <input type="text" name="policy" value={formData.policy || ""} onChange={handleChange} className={inputCls} />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select name="status" value={formData.status || "publish"} onChange={handleChange} className={inputCls}>
              <option value="publish">publish</option>
              <option value="draft">draft</option>
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description || ""} onChange={handleChange} rows={3} className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Overview</label>
            <textarea name="overview" value={formData.overview || ""} onChange={handleChange} rows={3} className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Amenities (one per line)</label>
            <textarea name="amenities" value={Array.isArray(formData.amenities) ? formData.amenities.join("\n") : (formData.amenities || "")} onChange={(e) => setFormData((p: any) => ({ ...p, amenities: e.target.value }))} rows={4} className={`${inputCls} resize-none`} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Chips (comma)</label>
            <input name="chips" value={Array.isArray(formData.chips) ? formData.chips.join(", ") : (formData.chips || "")} onChange={(e) => setFormData((p: any) => ({ ...p, chips: e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean) }))} className={inputCls} />
          </div>
        </div>
      </section>

      <div className="text-center pt-4">
        <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition shadow-lg hover:shadow-xl transform hover:scale-105 font-semibold text-lg flex items-center gap-2 mx-auto">
          <FileTextIcon className="w-5 h-5" /> {isEdit ? "Update Project" : "Submit Project"}
        </button>
      </div>
    </form>
  );
}
