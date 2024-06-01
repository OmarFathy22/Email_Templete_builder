import { EmailProps } from "@/app/emails/Welcome";
import toast from "react-hot-toast";
import upload from "@/utils/upload";
export const handleCreate = async (templete: EmailProps, setLoading: any) => {
  try {
    const res = await fetch("http://localhost:8000/templete/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templete),
    });
    setLoading(false);
    toast.success("Email Created successfully");
    setTimeout(() => {
      location.href = "/dashboard";
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
    toast.error("Something went wrong");
  }
};
export const handleUpdate = async (templete: EmailProps , setLoading:any) => {
  try {
    const res = await fetch(`http://localhost:8000/templete/${templete._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(templete),
    });
    setLoading(false);
    toast.success("Email Updated successfully");
    setTimeout(() => {
      location.href = "/dashboard";
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
    toast.error("Something went wrong");
  }
};
export const handleDelete = async (templete: EmailProps , setLoading:any) => {
  try {
    const res = await fetch(`http://localhost:8000/templete/${templete?._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setLoading(false);
    toast.success("Email Deleted successfully");
    setTimeout(() => {
      location.href = "/dashboard";
    }, 1000);
  } catch (error) {
    console.error("Error:", error);
    setLoading(false);
    toast.error("Something went wrong");
  }
};
