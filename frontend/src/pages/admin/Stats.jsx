import { useEffect, useState } from "react";
import api from "../../services/api";

export default function Stats() {

    const [stats, setStats] =
        useState(null);

    const [summary, setSummary] =
        useState({});

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData =
        async () => {

            try {

                const statsRes =
                    await api.get(
                        "/admin/stats"
                    );

                const summaryRes =
                    await api.get(
                        "/admin/orders/summary"
                    );

                setStats(
                    statsRes.data
                );

                setSummary(
                    summaryRes.data
                );

            } catch (error) {
                console.log(error);
            }
        };

    if (!stats) {
        return (
            <h2>
                Loading...
            </h2>
        );
    }

    return (
        <div
            style={{
                padding: "20px"
            }}
        >
            <h1>
                Admin Statistics
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fit,minmax(250px,1fr))",
                    gap: "20px"
                }}
            >
                <div>
                    <h3>
                        Users
                    </h3>
                    <p>
                        {stats.totalUsers}
                    </p>
                </div>

                <div>
                    <h3>
                        Chemists
                    </h3>
                    <p>
                        {stats.totalChemists}
                    </p>
                </div>

                <div>
                    <h3>
                        Pending Chemists
                    </h3>
                    <p>
                        {stats.pendingChemists}
                    </p>
                </div>

                <div>
                    <h3>
                        Delivery Boys
                    </h3>
                    <p>
                        {stats.totalDeliveryBoys}
                    </p>
                </div>

                <div>
                    <h3>
                        Orders
                    </h3>
                    <p>
                        {stats.totalOrders}
                    </p>
                </div>

                <div>
                    <h3>
                        Revenue
                    </h3>
                    <p>
                        ₹{stats.totalRevenue}
                    </p>
                </div>
            </div>

            <h2
                style={{
                    marginTop: "40px"
                }}
            >
                Order Summary
            </h2>

            <pre>
                {JSON.stringify(
                    summary,
                    null,
                    2
                )}
            </pre>
        </div>
    );
}