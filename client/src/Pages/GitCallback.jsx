import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { connectGithub } from "../Redux/Slices/userSlice";
const GitCallback = () => {
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {loading, error, user} = useSelector((state) => state.user)

    useEffect(() => {
        const code = searchParams.get("code")

        if(code){
            dispatch(connectGithub(code))
            .unwrap()
            .then(() =>{
                navigate("/connect")
            })
            .catch((error) => {
                console.log("Failed to connect",error)
                navigate("/connect")
            })
        }
    },[dispatch, searchParams, navigate])

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-xl font-semibold">Connecting to GitHub...</h2>
            {loading && <p>Verifying your account...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
        </div>
    )
}
export default GitCallback