const IconBox = ({ children, bg }: { children: React.ReactNode, bg: string }) => (
    <div className="w-[48px] h-[48px] rounded-[14px] flex items-center justify-center" style={{ background: bg }}>
        {children}
    </div>
);

export default IconBox