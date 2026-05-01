import { use, useRef, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const { _id: productId, title, price_min, price_max, image } = useLoaderData();
    const { user, loading } = use(AuthContext);
    const [bids, setBids] = useState([]);
    const bidModalRef = useRef(null);

    const handleBidModalOpen = () => {
        bidModalRef.current.showModal()
    }

    const handleBidSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const bid = e.target.bid.value;
        console.log(productId, name, email, bid);

        const newBid = {
            product: productId,
            buyer_name: name,
            buyer_email: email,
            buyer_image: user?.photURL,
            bid_price: bid,
            status: "pending",
        }

        fetch('http://localhost:3000/bids', {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(newBid),
        })
            .then(res => res.json())
            .then(data => {
                console.log("after bid", data);
                bidModalRef.current.close()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your bid has been placed",
                    showConfirmButton: false,
                    timer: 1500
                });
                const newBids = [...bids, newBid]
                newBids.sort((a, b) => b.bid_price - a.bid_price)
                setBids(newBids)

            })
    }

    useEffect(() => {
        fetch(`http://localhost:3000/products/bids/${productId}`, {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBids(data)
            })

    }, [productId, user])

    if (loading) return <p>loading...</p>

    return (
        <div>
            <div className="flex gap-6 my-10 justify-between flex-col md:flex-row">
                <div className="space-y-4">
                    <div>
                        <img src={image} className="max-w-125 rounded-lg" alt="" />
                    </div>
                    <div>
                        <h2>Product Description</h2>
                    </div>
                </div>

                <div className="w-full">
                    <Link>Back to Products</Link>
                    <h2>{title}</h2>
                    <div>
                        <h3>${price_min} - {price_max}</h3>
                        <p>Price Starts from</p>
                    </div>
                    <div>
                        <h3>Product Details</h3>
                        <p>Product ID : </p>
                        <p>Posted: </p>
                    </div>
                    <div>
                        <h2>Seller Information</h2>

                    </div>
                    <button
                        onClick={handleBidModalOpen}
                        className="btn btn-primary w-full">I Want Buy This Product</button>

                    <dialog ref={bidModalRef} className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg text-center mb-4">Give Seller Your Offered Price!</h3>

                            <form onSubmit={handleBidSubmit}>
                                <fieldset className="fieldset">
                                    <label className="label">Buyer Name</label>
                                    <input type="text" name="name" className="input w-full" readOnly defaultValue={user?.displayName} />
                                    <label className="label">Email</label>
                                    <input type="email" name="email" className="input w-full" readOnly defaultValue={user?.email} />
                                    <label className="label">Place your Price</label>
                                    <input type="text" className="input w-full" name="bid" placeholder="price" />
                                    <button className="btn btn-neutral mt-4">Place Your Bid</button>
                                </fieldset>
                            </form>

                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Cancel</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>

            </div>
            <div>
                <h2 className="text-3xl">Bids for this product: {bids.length} </h2>

                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    SL NO
                                </th>
                                <th>Buyer Name</th>
                                <th>Buyer Email</th>
                                <th>Bid Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                bids.map((bid, index) => <tr key={bid._id}>
                                    <th>
                                        {index + 1}
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={bid.buyer_image}
                                                        alt={title} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{bid.buyer_name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {bid.buyer_email}
                                    </td>
                                    <td>{bid.bid_price}</td>
                                    <th>
                                        <button className="btn btn-ghost btn-xs">details</button>
                                    </th>
                                </tr>)
                            }


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;