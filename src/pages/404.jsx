import React from "react";
import Layout from "../components/Layout";
import NOTFOUND from "../assets/images/404.avif";
import { AlertTriangle, Home } from "lucide-react";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <Layout className="mt-0">
            <div className="flex flex-col items-center justify-center w-screen h-screen text-center bg-white">
                <img src={NOTFOUND} alt="404" />
                <AlertTriangle size={80} className="text-primary mb-4 animate-bounce" />
                <p className="text-lg text-base-content/70 mb-6">
                    Trang bạn đang tìm không tồn tại hoặc đã bị di chuyển.
                </p>
                <Link
                    to="/"
                    className="btn btn-primary flex items-center gap-2 px-6 py-2 rounded-full"
                >
                    <Home size={18} />
                    Quay lại trang chủ
                </Link>
            </div>
        </Layout>
    );
};
export default NotFound;