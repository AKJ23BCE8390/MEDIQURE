import Navbar from "./Navbar";

export default function Layout({
    children
}) {
    return (
        <>
            <Navbar />

            <div
                style={{
                    minHeight:
                        "calc(100vh - 70px)",
                    padding:
                        "20px"
                }}
            >
                {children}
            </div>
        </>
    );
}