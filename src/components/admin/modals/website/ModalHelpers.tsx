export const CircularDropzone = ({ preview, onChange, id }: { preview: string | undefined; onChange: (url: string | undefined, file?: File) => void; id: string }) => {
  return (
    <div className="flex justify-center mb-[22px]">
      <div
        className="w-24 h-24 rounded-full border-2 border-dashed border-[var(--border-600)] bg-[var(--surface-500)] cursor-pointer overflow-hidden flex items-center justify-center relative hover:bg-[var(--surface-600)] transition-colors duration-140"
        onClick={() => document.getElementById(id)?.click()}
      >
        {preview ? (
          <img src={preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="stroke-[var(--text-secondary-300)]" strokeWidth="2" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
        <input
          id={id}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) onChange(URL.createObjectURL(f), f)
          }}
        />
      </div>
    </div>
  )
}

export const RectDropzone = ({ preview, onChange, id }: { preview: string | undefined; onChange: (url: string | undefined, file?: File) => void; id: string }) => {
  return (
    <div
      className="border-2 border-dashed border-[var(--border-600)] rounded-[var(--radius-md)] p-7 text-center mb-5 cursor-pointer bg-[var(--surface-500)] hover:bg-[var(--surface-600)] transition-colors duration-140"
      onClick={() => document.getElementById(id)?.click()}
    >
      {preview ? (
        <img src={preview} alt="preview" className="max-h-[120px] rounded-[var(--radius-sm)] mx-auto object-cover" />
      ) : (
        <>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="mx-auto mb-2 stroke-[var(--text-secondary-300)]" strokeWidth="2" strokeLinecap="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <div className="[font-family:var(--font-body)] text-[13px] text-[var(--text-secondary-300)]">
            Kéo thả hoặc <span className="text-[var(--brand-500)] font-semibold">chọn ảnh đại diện</span>
            <div className="text-[11px] mt-1 opacity-80">(Tối đa 10MB)</div>
          </div>
        </>
      )}
      <input
        id={id}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onChange(URL.createObjectURL(f), f)
        }}
      />
    </div>
  )
}

export const ModalHeader = ({ title, onClose }: { title: string; onClose: () => void }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="[font-family:var(--font-heading)] font-extrabold text-lg text-[var(--text-primary)]">
        {title}
      </div>
      <div
        onClick={onClose}
        className="bg-transparent border-none cursor-pointer text-[22px] text-[var(--text-secondary-300)] hover:text-[var(--text-primary)] outline-none"
      >
        ×
      </div>
    </div>
  )
}

export const mLabel = "block ![font-family:var(--font-heading)] !font-bold !text-[13px] !text-[var(--text-primary)] mb-1.5"
export const mInput = "w-full px-3.5 py-2.5 rounded-[var(--radius-sm)] border border-[var(--border-500)] bg-white [font-family:var(--font-body)] text-[13px] text-[var(--text-primary)] outline-none box-border focus:border-[var(--brand-500)]"
export const mSubmitBtnClass = "w-full py-3 rounded-[var(--radius-md)] border-none bg-[var(--brand-500)] !text-white ![font-family:var(--font-heading)] !font-bold !text-sm cursor-pointer mt-1.5 hover:bg-[var(--brand-600)] transition-colors duration-[var(--motion-fast)]"
