import { useEffect, useState } from "react";
import api from "../../services/api";

export default function DeliveryBoys() {

    const [deliveryBoys, setDeliveryBoys] =
        useState([]);

    useEffect(() => {
        fetchDeliveryBoys();
    }, []);

    const fetchDeliveryBoys =
        async () => {

            try {

                const res =
                    await api.get(
                        "/admin/delivery-boys"
                    );

                setDeliveryBoys(
                    res.data
                );

            } catch (error) {

                console.log(error);
            }
        };

    return (
        <div
            style={{
                padding: "20px"
            }}
        >
            <h1>
                Delivery Boys
            </h1>

            {deliveryBoys.length === 0 ? (
                <h3>
                    No Delivery Boys Found
                </h3>
            ) : (
                deliveryBoys.map(
                    boy => (
                        <div
                            key={boy._id}
                            style={{
                                border:
                                    "1px solid #ddd",
                                padding:
                                    "15px",
                                marginBottom:
                                    "15px"
                            }}
                        >
                            <h3>
                                {boy.name}
                            </h3>

                            <p>
                                Email:
                                {boy.email}
                            </p>

                            <p>
                                Phone:
                                {boy.phone}
                            </p>

                            <p>
                                Vehicle:
                                {boy.vehicleType}
                            </p>

                            <p>
                                Vehicle Number:
                                {boy.vehicleNumber}
                            </p>

                            <p>
                                Available:
                                {boy.isAvailable
                                    ? " Yes"
                                    : " No"}
                            </p>
                        </div>
                    )
                )
            )}
        </div>
    );
}