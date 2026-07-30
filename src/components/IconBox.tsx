const IconBox = ({ children, bg }: { children: React.ReactNode, bg: string }) => (
    <div style={{ width: 48, height: 48, borderRadius: 14, background: bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
    </div>
);

export default IconBox