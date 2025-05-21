"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { TransactionInputType } from "../types/TransactionType";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "./LoadingSpinner";

const EditTransactionPage = ({ id }: { id: string }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const { data: session } = useSession();
    const [transactionData, setTransactionData] = useState<TransactionInputType | undefined>();
    const username = session?.user?.email;
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                if (username) {
                    const res = await axios.get("/api/transaction", {
                        params: { id },
                    });
                    if (res.status === 200) {
                        const transaction = res.data.transaction;
                        console.log(transaction);
                        setTransactionData(transaction);
                    }
                }
            } catch (e: unknown) {
                console.error(`Error in fetching transaction data: ${e}`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [session]);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;

        setTransactionData((prevData) => {
            if (!prevData) return prevData;

            return {
                ...prevData,
                [name]: name === "amount" ? (value === "" ? "" : Number(value)) : value,
            };
        });
    };

    const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(transactionData);
        try {
            const res = await axios.patch("/api/transaction", {
                id,
                ...transactionData,
            });
            if (res.status === 200) {
                setTransactionData(res.data.transaction);
                router.back();
            }
        } catch (e: unknown) {
            console.error(`Unknown error spotted: ${e}`);
        }
    };

    return (
        <>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <form
                    onSubmit={handleOnSubmit}
                    className="bg-green-200 rounded-lg shadow-md p-6 m-4 w-auto max-w-lg mx-auto
        space-y-3"
                >
                    <h2 className="text-center text-2xl">Edit Transaction</h2>
                    <input
                        type="text"
                        placeholder="Title"
                        value={transactionData?.title || ""}
                        name="title"
                        onChange={handleOnChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    />
                    <input
                        type="number"
                        placeholder="Amount"
                        value={transactionData?.amount?.toString() || ""}
                        name="amount"
                        onChange={handleOnChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2
                focus:ring-green-400 [appearance:textfield]"
                    />

                    <input
                        type="text"
                        placeholder="Note"
                        value={transactionData?.note || ""}
                        name="note"
                        onChange={handleOnChange}
                        className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                    />

                    <div className="flex justify-center gap-5">
                        <button
                            type="submit"
                            disabled={!(transactionData?.title && transactionData?.amount && transactionData?.note)}
                            className="bg-green-500 text-white w-fit p-2 rounded cursor-pointer hover:bg-green-600
                  disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Edit Transaction
                        </button>
                        <button
                            type="button"
                            className="bg-green-500 text-white w-fit p-2 rounded cursor-pointer hover:bg-green-600"
                            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                                e.preventDefault();
                                router.back();
                            }}
                        >
                            Back
                        </button>
                    </div>
                </form>
            )}
        </>
    );
};

export default EditTransactionPage;
