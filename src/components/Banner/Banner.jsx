import leftImg from '../../assets/bg-hero-left.png';
import rightImg from '../../assets/bg-hero-right.png';
const Banner = () => {
    return (
        <div className="relative bg-linear-to-br from-[#FFE6FD] via-[#F3F0FF] to-[#E0F8F5] py-20 min-h-125">
            <h2 className='text-5xl font-bold text-center'>Deal Your <span className='text-gradient-primary'>Products</span> <br /> In A <span className='text-gradient-primary'>Smart</span> way ! </h2>
              {/* Left Shape */}
                <img
                    src={leftImg}
                    className="absolute left-0 top-0 w-72 opacity-30"
                />

                {/* Right Shape */}
                <img
                    src={rightImg}
                    className="absolute right-0 bottom-0 w-72 opacity-30"
                />
                <p className='text-center mt-4'>SmartDeals helps you sell, resell, and shop from trusted local sellers — all in one place!</p>

        </div>
    );
};

export default Banner;