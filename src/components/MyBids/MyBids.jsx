import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const MyBids = () => {
    const { user } = use(AuthContext);
    const [bids, setBids] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:3000/bids?email=${user.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setBids(data)
                })
        }
    }, [user])



    // useEffect(() => {
    //     if (user?.email) {
    //         fetch(`http://localhost:3000/bids?email=${user.email}`, {
    //             headers: {
    //                 authorization: `Bearer ${user?.accessToken}`,
    //             }
    //         })
    //             .then(res => res.json())
    //             .then(data => {
    //                 console.log(data)
    //                 setBids(data)
    //             })
    //     }
    // }, [user])

    const handleDeleteBid = (_id) => {
        fetch(`http://localhost:3000/bids/${_id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                console.log("data after delete ", data)
                Swal.fire({
                    title: "Are you sure?",
                    text: "You won't be able to revert this!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, delete it!"
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            if (data.deletedCount) {
                                const remainingBids = bids.filter(bid => bid._id !== _id);
                                setBids(remainingBids);

                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your bid has been deleted.",
                                    icon: "success"
                                });
                            }
                        }
                    });
            });
    }

    return (
        <div>
            <h3>My Bids: {bids.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                SL NO
                            </th>
                            <th>Product</th>
                            <th>Seller</th>
                            <th>Bid Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            bids.map((bid, index) => <tr className="border" key={bid._id}>
                                <th>
                                    {index + 1}
                                </th>

                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">Hart Hagerty</div>
                                            <div className="text-sm opacity-50">United States</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    Zemlak, Daniel and Leannon

                                </td>
                                <td>{bid.bid_price}</td>
                                <td>
                                    {bid.status === "pending" ? <div className="badge badge-warning">{bid.status}</div> : <div className="badge badge-success">{bid.status}</div>}
                                </td>
                                <td onClick={() => handleDeleteBid(bid._id)} className="btn btn-outline btn-xs">Remove Bid</td>
                            </tr>)
                        }

                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default MyBids;