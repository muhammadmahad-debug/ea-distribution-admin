
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "context/SidebarContext";
import { notifyError, notifySuccess } from "utils/toast";
import DiscountServices from "services/DiscountServices";

const useDiscountSubmit = (id, disdata) => {
 
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);
  const [resData, setResData] = useState({});

  const [email, setEmail] = useState([]);
  const [name, setName] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setChecked] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!isDrawerOpen) {
      setResData({});
      setEmail(disdata?.customers || []);
      setName(disdata?.products || []);
      setDiscount(disdata?.discountPrice || 0); 
       if (disdata !== undefined && disdata?.[0]?._id !== undefined) {
        setChecked(disdata[0]._id);
      }
      return;
    }

    if (id && isDrawerOpen) {
      (async () => {
        try {
          const resdis = await DiscountServices.getDiscountById(id);

          if (resdis) {
            setResData(resdis);
       
            setEmail( resdis.customers?.map((item) => ({
              name: item.email,
              _id: item._id,
            })) ?? [])
            setName( Array.isArray(resdis.products)
            ? resdis.products.map(({ _id, slug }) => ({
              namee: slug,
              _id: _id,
            }))
            : []);
            setDiscount(resdis.discountPrice);
          }
        } catch (err) {
          notifyError(err ? err.response.data.message : err.message);
        }
      })();
    }
  }, [id, isDrawerOpen, lang, clearErrors, disdata]);

  const onSubmit = async ({disdata}) => {
    console.log(disdata,"discount")
    try {
      setIsSubmitting(true);

      const selectedCustomerIds = email.map((item) => item._id);
      const selectedProductIds = name.map((item) => item._id);
      const discountData = {
        products: selectedProductIds,
        customers: selectedCustomerIds,
        discountPrice: discount,
      };

      if (id) {
        const res = await DiscountServices.updateDiscount(id, discountData);     
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
       reset();
      }
       else {
        const res = await DiscountServices.addDiscount(discountData);
        setIsUpdate(true);
        setIsSubmitting(false);
        notifySuccess(res.message);
        closeDrawer();
      }
    } catch (err) {
      setIsSubmitting(false);
      notifyError(err ? err?.response?.data?.message : err?.message);
      closeDrawer();
    }
  };

 
  const handleCustomerSelect = (selectedList) => {
    setEmail(selectedList);
  };

  const handleCustomerRemove = (removedList) => {
    setEmail(removedList);
  };

  const handleProductSelect = (selectedList) => {
    setName(selectedList);
  };

  const handleProductRemove = (removedList) => {
    setName(removedList);
  };

  const handleAddDiscount = () => {
    setDiscount((prevDiscount) => prevDiscount + 1);
  };

  const handleSubtractDiscount = () => {
    setDiscount((prevDiscount) => prevDiscount - 1);
  };

  const handleDiscountChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setDiscount(value);
    } else {
      setDiscount("");
    }
  };
  
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    email,
    handleCustomerSelect,
    handleCustomerRemove,
    name,
    handleProductSelect,
    handleProductRemove,
    discount,
    handleAddDiscount,
    handleSubtractDiscount,
    handleDiscountChange,
    isSubmitting,
    setEmail,
    setDiscount,
    setName,
    id,
    resData
  };
};

export default useDiscountSubmit;
