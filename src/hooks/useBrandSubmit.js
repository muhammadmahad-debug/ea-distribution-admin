import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import { useContext } from "react";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import BrandServices from "services/BrandServices";
import useToggleDrawer from "./useToggleDrawer";
import { useEffect } from "react";



const useBrandSubmit = (id) => {
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } =
    useContext(SidebarContext);
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [brandImage, setBarndImage] = useState("");
  const [metaImage, setMetaImage] = useState('')
  const [brandData, setBrandData] = useState('')

  const { setServiceId } = useToggleDrawer()

  const {
    handleSubmit,
    register,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {

    console.log(data, "data")
    let res;
    try {
      if (id) {
        res = await BrandServices.updateBrand(data);
        console.log(res, "upbrand")
      } else {
        res = await BrandServices.addBarnd(data);

      }
      setIsUpdate(true);
      setIsSubmitting(false);
      notifySuccess(res.message);
      closeDrawer();
      reset();
      setServiceId();
    } catch (error) {
      console.error("An error occurred:", error);

    }


    // try {
    //   setIsSubmitting(true);
    //   if (!id) {
    //     if (variants.length === 0) {
    //       notifyError('Minimum one value is required for add attribute!');
    //       return;
    //     }
    //   }


    //   // console.log("BrandData",BrandData );

    //   if (id) {
    //      const res = await AttributeServices.updateAttributes(id, attributeData);
    //      setIsUpdate(true);
    //      setIsSubmitting(false);
    //      notifySuccess(res.message);
    //      closeDrawer();
    //      setServiceId();
    //   } else {
    //     const res = await AttributeServices.addAttribute(attributeData);
    //     setIsUpdate(true);
    //     setIsSubmitting(false);
    //     notifySuccess(res.message);
    //     closeDrawer();
    //     setServiceId();
    //   }
    // } catch (err) {
    //   notifyError(err ? err.response.data.message : err.message);
    //   closeDrawer();
    //   setIsSubmitting(false);
    //   setServiceId();
    // }
  }

  const getBrandDataById = async (id) => {
    console.log("kuch be")
    try {
      const response = await BrandServices.getIdBrand(id);

      console.log(response, "brandid");
      setValue("name", response.name)
      setValue("logo", response.logo)
      setValue("metaTitle", response.metaTitle)
      setValue("metaDescription", response.metaDescription)
      setValue("metaImage", response.metaImage)
      setValue("slug", response.slug)

      setImageUrl(response.logo)
      setMetaImage(response.metaImage)
    } catch (error) {
      console.error("An error occurred:", error);

    }
  }

  useEffect(() => {
    if (id) {
      getBrandDataById(id)
    }
    else {
      setImageUrl("")
      setMetaImage("")
      setValue("name")
      setValue("metaImage")
      setValue("metaDescription")
      setValue("logo")
      setValue("metaImage")
      setValue("metaTitle");
      setValue("slug")

    }
  }, [id])



  async function fetchData() {
    try {
      const getAllBrand = await BrandServices.getBrand();
      setBrandData(getAllBrand)
      console.log(getAllBrand, "brand");
    } catch (error) {
      console.error("An error occurred:", error);

    }
  }
  useEffect(() => {
    fetchData();
  }, [])


  return {
    handleSubmit,
    onSubmit,
    register,
    brandImage,
    setBarndImage,
    setImageUrl,
    imageUrl,
    setValue,
    metaImage,
    setMetaImage,
    id,
    brandData,
    setBrandData

  };
}



export default useBrandSubmit;