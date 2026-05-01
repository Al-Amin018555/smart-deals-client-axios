import axios from "axios";
import Swal from "sweetalert2";

const CreateAProduct = () => {
    const handleCreateAProduct = e => {
        e.preventDefault()
        const title = e.target.title.value;
        const photo = e.target.photo.value;
        const min_price = e.target.min_price.value;
        const max_price = e.target.max_price.value;
        console.log(title, photo, min_price, max_price);

        const newProduct = { title, photo, min_price, max_price }

        axios.post("http://localhost:3000/products", newProduct)
            .then(data => {
                console.log(data)
                if (data.data.insertedId) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your product has been created",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    return (
        <div className="my-10 w-3/6 mx-auto">
            <form onSubmit={handleCreateAProduct}>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input type="text" name="title" className="input w-full" placeholder="product title" />
                    <label className="label">Image Url</label>
                    <input type="text" name="photo" className="input w-full" placeholder="image url" />
                    <label className="label">Min Price</label>
                    <input type="text" className="input w-full" name="min_price" placeholder="min price" />
                    <label className="label">Max Price</label>
                    <input type="text" className="input w-full" name="max_price" placeholder="max price" />
                    <button className="btn btn-neutral mt-4">Add A Product</button>
                </fieldset>
            </form>

        </div>
    );
};

export default CreateAProduct;