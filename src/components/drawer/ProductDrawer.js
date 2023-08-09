import ReactTagInput from "@pathofdev/react-tag-input";
import {
  Button,
  Input,
  TableCell,
  TableContainer,
  TableHeader,
  Textarea,
  Table,
} from "@windmill/react-ui";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { MultiSelect } from "react-multi-select-component";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FiX } from "react-icons/fi";
import useProductSubmit from "hooks/useProductSubmit";
import UploaderThree from "components/image-uploader/UploaderThree";
import Title from "components/form/Title";
import SwitchToggleForCombination from "components/form/SwitchToggleForCombination";
import ActiveButton from "components/form/ActiveButton";
import LabelArea from "components/form/LabelArea";
import Error from "components/form/Error";
import Uploader from "components/image-uploader/Uploader";
import InputArea from "components/form/InputArea";
import ParentCategory from "components/category/ParentCategory";
import InputValue from "components/form/InputValue";
import InputValueFive from "components/form/InputValueFive";
import AttributeOptionTwo from "components/attribute/AttributeOptionTwo";
import RSelect from "components/select";
import DrawerButton from "components/form/DrawerButton";
import AttributeListTable from "components/attribute/AttributeListTable";
import { showingTranslateValue } from "utils/translate";
import useAsync from "hooks/useAsync";
import CustomerServices from "services/CustomerServices";
import Switcher from "components/bth";
import ShowHideButton from "components/table/ShowHideButton";
import ProductServices from "services/ProductServices";
import CategoryServices from "services/CategoryServices";

//internal import

const ProductDrawer = ({ id }) => {
  const { t } = useTranslation();

  const {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    errors,
    slug,
    openModal,
    attribue,
    setValues,
    variants,
    imageUrl,
    setImageUrl,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    // productId,
    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProductTap,
    selectedCategory,
    setSelectedCategory,
    // setDefaultCategory,
    // defaultCategory,
    handleProductSlug,
    handleSelectLanguage,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
    minimumPurchaseQuantity,
    setMinimumPurchaseQuantity,
    weight,
    setweight,
    barcode,
    setBarcode,

    selectedUnit,
    setSelectedUnit,
    thumbnailImage,
    setThumbnailImage,
    videoLink,
    setVideoLink,
    videoProvider,
    setVideoProvider,
    discountPrice,
    setDiscountPrice,
    point,
    setPoint,
    quantity,
    setQuantity,
    sku,
    setSku,
    externalLink,
    setExternalLink,
    externalLinkButtonText,
    setExternalLinkButtonText,
    metaDescription,
    setMetaDescription,
    metaTitle,
    setMetaTitle,
    metaImage,
    setMetaImage,

    category,
    setCategory,
    isPublished,
    setisPublished,
    isFeatured,
    setIsFeatured,

    //
    pdfSpecification,
    setPdfSpecification,
    selectedSingleCategory,
    setselectedSingleCategory,
    selectedBrand,
    setSelectedBrand,
    setValue,
    tags,
    handleKeyPress,
    tagInput,
    setTagInput,
  } = useProductSubmit(id);

  const currency = globalSetting?.default_currency || "$";

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  const [unit, setUnit] = useState([]);
  // const [selectedUnit, setSelectedUnit] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const data = await ProductServices.getUnit();
      setUnit(data);
    };
    fetchData().catch(console.error);
  }, []);

  const Unitdata = Array.isArray(unit)
    ? unit.map((item) => ({ label: item.name }))
    : [];

  const handleUnitChange = (selectedOption) => {
    setSelectedUnit(selectedOption);
    setValue("unit", selectedOption.label);
  };

  const [brand, setBrand] = useState([]);
  //const [selectedBrand, setSelectedBrand] = useState(null)
  useEffect(() => {
    const fetchData = async () => {
      const data = await ProductServices.getBrand();
      setBrand(data);
    };
    fetchData().catch(console.error);
  }, []);

  const Brand = Array.isArray(brand)
    ? brand.map((item) => ({ value: item._id, label: item.name }))
    : [];
  console.log(Brand, "brand");

  useEffect(() => {
    const fetchData = async () => {
      const data = await CategoryServices.getAllCategory();
      setCategory(data);
      console.log(data, "dat");
    };
    fetchData().catch(console.error);
  }, []);

  const getcategory = Array.isArray(category)
    ? category.map((item) => ({ value: item._id, label: item.name.en }))
    : [];
  const handleCategoryChange = (getcategory) => {
    setselectedSingleCategory(getcategory);
    setValue("category", getcategory.value);
  };

  const handleBrandChange = (selectedOption) => {
    setValue("brand", selectedOption?.label);
    setSelectedBrand(selectedOption);
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="absolute top-0 right-0 text-red-500 focus:outline-none active:outline-none text-xl border-0">
            <FiX className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSelectImage={handleSelectImage}
          />
        </div>
      </Modal>

      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            register={register}
            //handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateProduct")}
            //  description={t("UpdateProductDescription")}
          />
        ) : (
          <Title
            register={register}
            //handleSelectLanguage={handleSelectLanguage}
            title={t("Add new Product")}
            // description={t("AddProductDescription")}
          />
        )}
      </div>

      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700">
        {/* <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        /> */}

        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Product Information"
              handleProductTap={handleProductTap}
            />
          </li>

          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleProductTap={handleProductTap}
              />
            </li>
          )}
        </ul>
      </div>

      <Scrollbars className="track-horizontal thumb-horizontal w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block" id="block">
          {tapValue === "Basic Info" && (
            <div className="flex">
              <div className="w-3/4 px-3 py-0">
                <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
                  {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductID")} />
                <div className="col-span-8 sm:col-span-4">{productId}</div>
              </div> */}
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Product Name*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        {...register(`title`, {
                          required: "TItle is required!",
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="title"
                        type="text"
                        placeholder={t("Product Name")}
                        // onBlur={(e) => handleProductSlug(e.target.value)}
                      />
                      <Error errorName={errors.title} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Category*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <RSelect
                        options={getcategory}
                        placeholder=" Select Category"
                        value={selectedSingleCategory}
                        onChange={handleCategoryChange}
                        isClearable
                      ></RSelect>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Brand")} />
                    <div className="col-span-8 sm:col-span-4">
                      <RSelect
                        options={Brand}
                        placeholder="Select Brand"
                        value={selectedBrand}
                        onChange={handleBrandChange}
                        isClearable
                        // onChange={(e) => {
                        //   formik?.setFieldValue("categoryId", e);
                        // }}
                        // error={formik?.errors?.categoryId}
                        // touched={formik?.touched?.categoryId}
                        // onBlur={formik?.handleBlur}
                        // value={formik?.values?.categoryId}
                        // name="category"
                        // id="category"
                      ></RSelect>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Unit" />
                    <div className="col-span-8 sm:col-span-4">
                      <RSelect
                        options={Unitdata}
                        placeholder="Select Unit"
                        value={selectedUnit}
                        onChange={handleUnitChange}
                        isClearable
                        // onChange={(e) => {
                        //   setUnit("unit", e);
                        // }}
                        // error={formik?.errors?.categoryId}
                        // touched={formik?.touched?.categoryId}
                        // onBlur={formik?.handleBlur}
                        // value={formik?.values?.categoryId}
                        // name="category"
                        // id="category"
                      ></RSelect>
                      <Error errorName={errors.name} />
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("unit*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        {...register(`unit`, {
                          required: "Unit is required!",
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="unit"
                        type="text"
                        placeholder={t("Unit (e.g. KG, Pc etc")}
                        // onBlur={(e) => handleProductSlug(e.target.value)}
                      />
                      <Error errorName={errors.unit} />
                    </div>
                  </div> */}
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Weight (in kg)*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        {...register(`weight`, {
                          required: "Weight is required!",
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="weight"
                        type="number"
                        placeholder={t("0.00")}
                        // onBlur={(e) => handleProductSlug(e.target.value)}
                      />
                      <Error errorName={errors.unit} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Minimum Purchase Quantity")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        {...register(`minimumPurchaseQuantity`, {
                          required: "Minimum Purchase Quantity is required!",
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="minimumPurchaseQuantity"
                        type="number"
                        placeholder={t("1")}
                        // onBlur={(e) => handleProductSlug(e.target.value)}
                      />
                      <Error errorName={errors.minimumPurchaseQuantity} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Tag")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        // {...register("tag", {
                        //   required: false,
                        // })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="tag"
                        type="text"
                        placeholder={t("Type and hit enter to add a tag")}
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                      {/* <Error errorName={errors.tag} /> */}
                      <div>
                        {tags.length != 0 ? (
                          tags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-500 text-white px-2 py-1 rounded-full mr-2 mt-2"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span>
                            This is used for search. Input those word by which
                            customer can find this product.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Bar code*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        {...register(`barcode`, {
                          required: "bar code is required!",
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="barcode"
                        type="text"
                        placeholder={t("barcode")}
                        // onBlur={(e) => handleProductSlug(e.target.value)}
                      />
                      <Error errorName={errors.barcode} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Description*" />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="description"
                        name="description"
                        type="2"
                        placeholder="Description"
                      />
                      <span>
                        This is use for search input those words by which
                        customer can find this product
                      </span>
                      <Error errorName={errors.name} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Slug*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        {...register(`slug`, {
                          required: "Slug is required!",
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="slug"
                        type="text"
                        placeholder={t("slug")}
                        // onBlur={(e) => handleProductSlug(e.target.value)}
                      />
                      <Error errorName={errors.slug} />
                    </div>
                  </div>
                  {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Stock*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        {...register(`stock`, {
                          required: "Stock is required!",
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="stock"
                        type="number"
                        placeholder={t("stock")}
                        // onBlur={(e) => handleProductSlug(e.target.value)}
                      />
                      <Error errorName={errors.stock} />
                    </div>
                  </div> */}

                  <div className="w-full relative pb-2 mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title title={t("Product Image")} />
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Gallery Image (500x500)")} />
                    <div className="col-span-8 sm:col-span-4">
                      <div className=" border-gray">
                        <div className="p-2 inline-block">
                          <Uploader
                            product
                            folder="product"
                            imageUrl={imageUrl}
                            setImageUrl={setImageUrl}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Thumbnail Image (300x300)")} />
                    <div className="col-span-8 sm:col-span-4">
                      <div className=" border-gray">
                        <div className="p-2 inline-block">
                          <Uploader
                            folder="product"
                            imageUrl={thumbnailImage}
                            setImageUrl={setThumbnailImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full relative pb-2 mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title title={t("Product Video")} />
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Video Provider")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        name="videoProvide"
                        type="text"
                        placeholder="YouTube"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Video Link")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        name="videoLink"
                        type="text"
                        placeholder="Video Link"
                      />
                      <span>
                        use proper link without extra paramater.Dont use short
                        share link/embeded iframe code
                      </span>
                    </div>
                  </div>
                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title title={t("Product price + stock")} />
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Unit price*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="unitPrice"
                        name="unitPrice"
                        type="number"
                        placeholder="0"
                      />
                      <Error errorName={errors.unitPrice} />
                    </div>
                  </div>

                  {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Discount data Range")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        label="discount"
                        name="discount"
                        type="text"
                        placeholder="Select data Range"
                      />
                    </div>
                  </div> */}

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Discount")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="discount"
                        name="discount"
                        type="number"
                        placeholder="Discount"
                      />
                      <Error errorName={errors.discount} />

                      {/* <RSelect options={options} placeholder="Flat"></RSelect> */}
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Set Point")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="point"
                        name="point"
                        type="number"
                        placeholder="0"
                      />
                      <Error errorName={errors.point} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Quantity")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="quantity"
                        name="quantity"
                        type="number"
                        placeholder="0"
                      />
                      <Error errorName={errors.quantity} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("SKU*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Input
                        {...register(`sku`, {
                          required: "SKU is required!",
                        })}
                        className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                        name="sku"
                        type="text"
                        placeholder={t("Sku")}
                        // onBlur={(e) => handleProductSlug(e.target.value)}
                      />
                      <Error errorName={errors.sku} />
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("External Link")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="externalLink"
                        name="externalLink"
                        type="text"
                        placeholder="External Link"
                      />
                      <Error errorName={errors.externalLink} />

                      <span>
                        Leave it blanck if you do not use external site link
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("External Link button")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="externalLinkButtonText"
                        name="externalLinkButtonText"
                        type="text"
                        placeholder="External Link button text"
                      />
                      <Error errorName={errors.externalLinkButtonText} />
                      <span>
                        Leave it blanck if you do not use external site link
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Description*" />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="description"
                        name="description"
                        type="2"
                        placeholder="Description"
                      />
                      <span>
                        This is use for search input those words by which
                        customer can find this product
                      </span>
                      <Error errorName={errors.name} />
                    </div>
                  </div>

                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title register={register} title={t("PDF Specification")} />
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("PDF Specification")} />
                    <div className="col-span-8 sm:col-span-4">
                      <div className=" border-gray">
                        <div className=" p-2 inline-block">
                          <Uploader
                            accept=".pdf"
                            imageUrl={pdfSpecification}
                            setImageUrl={setPdfSpecification}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title register={register} title={t("SEO Meta Tags")} />
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Meta Title")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="metaTitle"
                        name="metaTitle"
                        type="text"
                        placeholder="Meta Title"
                      />
                      <Error errorName={errors.metaTitle} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Meta Description")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="metaDescription"
                        name="metaDescription"
                        type="text"
                        placeholder="Meta Title"
                      />
                      <Error errorName={errors.metaDescription} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Meta Image")} />
                    <div className="col-span-8 sm:col-span-4">
                      <div className="border-gray">
                        <div className="p-2 inline-block">
                          <Uploader
                            folder="product"
                            imageUrl={metaImage}
                            setImageUrl={setMetaImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* 


                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Unit" />
                    <div className="col-span-8 sm:col-span-4">
                      <RSelect
                        options={Unitdata}
                        placeholder="Select Unit"
                        value={selectedUnit}
                        onChange={handleUnitChange}
                        isClearable
                        // onChange={(e) => {
                        //   setUnit("unit", e);
                        // }}
                        // error={formik?.errors?.categoryId}
                        // touched={formik?.touched?.categoryId}
                        // onBlur={formik?.handleBlur}
                        // value={formik?.values?.categoryId}
                        // name="category"
                        // id="category"
                      ></RSelect>
                      <Error errorName={errors.name} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Weight (in kg)" />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="weight"
                        name="weight"
                        type="number"
                        value={weight}
                        onChange={(e) => setweight(e.target.value)}
                        placeholder="0.00"
                      />
                      <Error errorName={errors.name} />
                    </div>
                  </div>

           

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Tags*" />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="tag"
                        name="tag"
                        type="text"
                        value={tag}
                        onChange={(e) => setTag(e.target.value)}
                        placeholder="Type and hit enter to add a tag"
                      />
                      <span>
                        This is use for search input those words by which
                        customer can find this product
                      </span>
                      <Error errorName={errors.name} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Barcode" />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="Name"
                        name="name"
                        type="text"
                        value={barcode}
                        onChange={(e) => setBarcode(e.target.value)}
                        placeholder="Barcode"
                      />

                      <Error errorName={errors.name} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label="Refundable" />
                    <div className="col-span-8 sm:col-span-4">
                      <ShowHideButton status="show" />
                    </div>
                  </div>

                  <div className="w-full relative pb-2 mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title register={register} title={t("Product Image")} />
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Gallery Image (500x500)")} />
                    <div className="col-span-8 sm:col-span-4">
                      <div className=" border-gray">
                        <div className="p-2 inline-block">
                          <Uploader
                            product
                            folder="product"
                            imageUrl={imageUrl}
                            setImageUrl={setImageUrl}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

              

                  <div className="w-full relative pb-2 mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title register={register} title={t("Product Video")} />
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Video Provider")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="videoProvide"
                        name="videoProvide"
                        value={videoProvider}
                        onChange={(e) => setVideoProvider(e.target.value)}
                        type="text"
                        placeholder="YouTube"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Video Link")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="videoLink"
                        name="videoLink"
                        type="text"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                        placeholder="Video Link"
                      />
                      <span>
                        use proper link without extra paramater.Dont use short
                        share link/embeded iframe code
                      </span>
                    </div>
                  </div>

                  <div className="w-full relative pb-2 mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title register={register} title={t("Product Variation")} />
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Color")} />
                    <div className="col-span-8 sm:col-span-4">
                      <RSelect
                        options={options}
                        placeholder="nothing Selected"
                      ></RSelect>
                    </div>
                  </div>

                  <div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Attributes")} />
                      <div className="col-span-8 sm:col-span-4">
                        <RSelect
                          options={options}
                          placeholder="nothing Selected"
                        ></RSelect>
                      </div>
                    </div>
                    <span>
                      chosse the attributes off product and input valuse of each
                      attribute
                    </span>
                  </div>

                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title
                      register={register}
                      title={t("Product price + stock")}
                    />
                  </div>
                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Unit price*")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        label="unitprice"
                        name="unitprice"
                        type="number"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Discount data Range")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        label="discount"
                        name="discount"
                        type="text"
                        placeholder="Select data Range"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Discount")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        label="discountPrice"
                        name="discountPrice"
                        value={discountPrice}
                        onChange={(e) => setDiscountPrice(e.target.value)}
                        type="text"
                        placeholder="Discount"
                      />
                      <RSelect options={options} placeholder="Flat"></RSelect>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Set Point")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        label="point"
                        name="point"
                        value={point}
                        onChange={(e) => setPoint(e.target.value)}
                        type="number"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Quantity")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        label="unitprice"
                        name="unitprice"
                        type="number"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("ProductSKU")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        label={t("ProductSKU")}
                        name="sku"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        type="text"
                        placeholder={t("ProductSKU")}
                      />
                      <Error errorName={errors.sku} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("External Link")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        label="externalLink"
                        name="externalLink"
                        value={externalLink}
                        onChange={(e) => setExternalLink(e.target.value)}
                        type="text"
                        placeholder="External Link"
                      />
                      <span>
                        Leave it blanck if you do not use external site link
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("External Link button")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        required="false"
                        label="externalLinkButtonText"
                        name="externalLinkButtonText"
                        value={externalLinkButtonText}
                        onChange={(e) =>
                          setExternalLinkButtonText(e.target.value)
                        }
                        type="text"
                        placeholder="External Link button text"
                      />
                      <span>
                        Leave it blanck if you do not use external site link
                      </span>
                    </div>
                  </div>

                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title
                      register={register}
                      title={t("Product Description")}
                    />
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("ProductDescription")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Textarea
                        className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        {...register("description", {
                          required: false,
                        })}
                        name="description"
                        placeholder={t("ProductDescription")}
                        value={metaDescription}
                        onChange={(e) => setMetaDescription(e.target.value)}
                        rows="4"
                        spellCheck="false"
                      />
                      <Error errorName={errors.description} />
                    </div>
                  </div>

                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title register={register} title={t("PDF Specification")} />
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("PDF Specification")} />
                    <div className="col-span-8 sm:col-span-4">
                      <div className=" border-gray">
                        <div className=" p-2 inline-block">
                          <Uploader
                            accept=".pdf"
                            imageUrl={pdfSpecification}
                            setImageUrl={setPdfSpecification}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title register={register} title={t("SEO Meta Tags")} />
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Meta Title")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="metaTitle"
                        name="metaTitle"
                        value={metaTitle}
                        onChange={(e) => setMetaTitle(e.target.value)}
                        type="text"
                        placeholder="Meta Title"
                      />
                      <Error errorName={errors.name} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Description")} />
                    <div className="col-span-8 sm:col-span-4">
                      <Textarea
                        className="border text-sm focus:outline-none block w-full bg-gray-100 border-transparent focus:bg-white"
                        {...register("description", {
                          required: false,
                        })}
                        name="description"
                        placeholder={t("Description")}
                        rows="4"
                        spellCheck="false"
                      />
                      <Error errorName={errors.description} />
                    </div>
                  </div>

                  <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Meta Image")} />
                    <div className="col-span-8 sm:col-span-4">
                      <div className="border-gray">
                        <div className="p-2 inline-block">
                          <Uploader
                            folder="product"
                            imageUrl={metaImage}
                            setImageUrl={setMetaImage}
                          />
                        </div>
                      </div>
                    </div>
                  </div> 
                  */}
                </div>
              </div>

              <div className="w-1/4 pl-3 pr-6 py-0">
                <div className="bg-white shadow-md p-4 mb-8">
                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title
                      register={register}
                      title={t("Shipping Configuration")}
                    />
                  </div>

                  <div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Free Shipping ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ShowHideButton status={true} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Flat Rate ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ShowHideButton status={true} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("is Product Quantity Multiply ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ShowHideButton status={true} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white shadow-md p-4 mb-8">
                    <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      <Title
                        register={register}
                        title={t("low stock Quantity Warning")}
                      />
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Quantity ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          register={register}
                          label="quantity"
                          name="quanti"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          type="number"
                          placeholder="1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md p-4 mb-8">
                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title
                      register={register}
                      title={t("Stock Visibility state")}
                    />
                  </div>

                  <div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Show Stock Quantity ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ShowHideButton status={true} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("show stock with text only ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ShowHideButton status={true} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Hide Stock ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ShowHideButton status={true} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white shadow-md p-4 mb-8">
                    <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      <Title
                        register={register}
                        title={t("Cash on delivery")}
                      />
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Status ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ShowHideButton status={true} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white shadow-md p-4 mb-8">
                    <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      <Title register={register} title={t("Featured")} />
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Status ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ShowHideButton status={true} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white shadow-md p-4 mb-8">
                    <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      <Title register={register} title={t("Today Deal")} />
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Status ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <ShowHideButton status={true} />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white shadow-md p-4 mb-8">
                    <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                      <Title register={register} title={t("Flash Deal")} />
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Add to Flash  ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <RSelect options={options}></RSelect>
                      </div>
                    </div>

                    {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Discount  ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <InputArea
                          register={register}
                          label="Name"
                          name="name"
                          type="number"
                          placeholder="0"
                        />
                      </div>
                    </div> */}

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label={t("Discount Type  ")} />
                      <div className="col-span-8 sm:col-span-4">
                        <RSelect options={options}></RSelect>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-md p-4 mb-8">
                  <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title
                      register={register}
                      title={t("Estimate Shipping Time")}
                    />
                  </div>

                  {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                    <LabelArea label={t("Shipping Days  ")} />
                    <div className="col-span-8 sm:col-span-4">
                      <InputArea
                        register={register}
                        label="Name"
                        name="name"
                        type="text"
                        placeholder="Shipping Days"
                      />
                    </div>
                  </div> */}
                </div>

                <div className="bg-white shadow-md p-4 mb-8">
                  {/* <div className="w-full relative pb- mb-6 border-b border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
                    <Title register={register} title={t("Vat & tax")} />
                  </div>

                  <div className="mb-6">
                    <div className="mb-1">
                      <LabelArea label={t("tax  ")} className="block" />
                    </div>
                    <div className="flex items-center -mx-1">
                      <div className="w-1/2 px-1">
                        <InputArea
                          register={register}
                          label="Name"
                          name="tax"
                          type="number"
                          placeholder="0"
                        />
                      </div>
                      <div className="w-1/2 px-1">
                        <RSelect options={options}></RSelect>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="mb-1">
                      <LabelArea label={t("vat ")} />
                    </div>
                    <div className="flex items-center -mx-1">
                      <div className="w-1/2 px-1">
                        <InputArea
                          register={register}
                          label="Name"
                          name="name"
                          type="number"
                          placeholder="0"
                        />
                      </div>
                      <div className="w-1/2 px-1">
                        <RSelect options={options}></RSelect>
                      </div>
                    </div>
                  </div> */}

                  {/* </div>
            </div> */}
                </div>

                <div>
                  {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                <LabelArea label={t("ProductImage")} />
                <div className="col-span-8 sm:col-span-4">
                  <Uploader
                    product
                    folder="product"
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                  />
                </div>
              </div> */}
                </div>

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("ProductSKU")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      required="false"
                      label={t("ProductSKU")}
                      name="sku"
                      type="text"
                      placeholder={t("ProductSKU")}
                    />
                    <Error errorName={errors.sku} />
                  </div>
                </div> */}

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  {/* <LabelArea label={t("ProductBarcode")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      required="false"
                      label={t("ProductBarcode")}
                      name="barcode"
                      type="text"
                      placeholder={t("ProductBarcode")}
                    />
                    <Error errorName={errors.barcode} />
                  </div> */}
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  {/* <LabelArea label={t("Category")} />
                  <div className="col-span-8 sm:col-span-4">
                    <ParentCategory
                      lang={language}
                      selectedCategory={selectedCategory}
                      setSelectedCategory={setSelectedCategory}
                      setDefaultCategory={setDefaultCategory}
                    />
                  </div> */}
                </div>

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("DefaultCategory")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Multiselect
                      displayValue="name"
                      isObject={true}
                      singleSelect={true}
                      ref={resetRefTwo}
                      hidePlaceholder={true}
                      onKeyPressFn={function noRefCheck() { }}
                      onRemove={function noRefCheck() { }}
                      onSearch={function noRefCheck() { }}
                     // onSelect={(v) => setDefaultCategory(v)}
                      selectedValues={defaultCategory}
                      options={selectedCategory}
                      placeholder={"Default Category"}
                    ></Multiselect>
                  </div>
                </div> */}

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Product Price" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputValue
                      register={register}
                      maxValue={2000}
                      minValue={1}
                      label="Original Price"
                      name="originalPrice"
                      type="number"
                      placeholder="OriginalPrice"
                      defaultValue={0.0}
                      required="false"
                      product
                      currency={currency}
                    />
                    <Error errorName={errors.originalPrice} />
                  </div>
                </div> */}
                {/* 
                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("SalePrice")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputValue
                      product
                      register={register}
                      minValue={0}
                      defaultValue={0.0}
                      required="false"
                      label="Sale price"
                      name="price"
                      type="number"
                      placeholder="Sale price"
                      currency={currency}
                    />
                    <Error errorName={errors.price} />
                  </div>
                </div> */}

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 relative">
                  <LabelArea label={t("ProductQuantity")} />
                  <div className="col-span-8 sm:col-span-4">
                    <InputValueFive
                      register={register}
                      minValue={0}
                      defaultValue={0}
                      label="Quantity"
                      name="stock"
                      type="number"
                      placeholder={t("ProductQuantity")}
                    />
                    <Error errorName={errors.stock} />
                  </div>
                </div> */}

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("ProductSlug")} />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      {...register(`slug`, {
                        required: "slug is required!",
                      })}
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      name="slug"
                      type="text"
                      defaultValue={slug}
                      placeholder={t("ProductSlug")}
                      onBlur={(e) => handleProductSlug(e.target.value)}
                    />
                    <Error errorName={errors.slug} />
                  </div>
                </div> */}

                {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label={t("ProductTag")} />
                  <div className="col-span-8 sm:col-span-4">
                    <ReactTagInput
                      placeholder={t("ProductTagPlaseholder")}
                      tags={tag}
                      onChange={(newTags) => setTag(newTags)}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          )}

          {tapValue === "Combination" &&
            isCombination &&
            (attribue.length < 1 ? (
              <div
                className="bg-teal-100 border border-teal-600 rounded-md text-teal-900 px-4 py-3 m-4"
                role="alert"
              >
                <div className="flex">
                  <div className="py-1">
                    <svg
                      className="fill-current h-6 w-6 text-teal-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm">
                      {t("AddCombinationsDiscription")}{" "}
                      <Link to="/attributes" className="font-bold">
                        {t("AttributesFeatures")}
                      </Link>
                      {t("AddCombinationsDiscriptionTwo")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6">
                {/* <h4 className="mb-4 font-semibold text-lg">Variants</h4> */}
                <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-3 md:gap-3 xl:gap-3 lg:gap-2 mb-3">
                  <MultiSelect
                    options={attTitle}
                    value={attributes}
                    onChange={(v) => handleAddAtt(v)}
                    labelledBy="Select"
                  />

                  {attributes?.map((attribute, i) => (
                    <div key={attribute._id}>
                      <div className="flex w-full h-10 justify-between font-sans rounded-tl rounded-tr bg-gray-200 px-4 py-3 text-left text-sm font-normal text-gray-700 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                        {"Select"}
                        {showingTranslateValue(attribute?.title, language)}
                      </div>

                      <AttributeOptionTwo
                        id={i + 1}
                        values={values}
                        lang={language}
                        attributes={attribute}
                        setValues={setValues}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mb-6">
                  {attributes?.length > 0 && (
                    <Button
                      onClick={handleGenerateCombination}
                      type="button"
                      className="mx-2"
                    >
                      <span className="text-xs">{t("GenerateVariants")}</span>
                    </Button>
                  )}

                  {variantTitle.length > 0 && (
                    <Button onClick={handleClearVariant} className="mx-2">
                      <span className="text-xs">{t("ClearVariants")}</span>
                    </Button>
                  )}
                </div>
              </div>
            ))}

          {isCombination ? (
            <DrawerButton
              id={id}
              save
              title="Product"
              isSubmitting={isSubmitting}
              handleProductTap={handleProductTap}
            />
          ) : (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}

          {tapValue === "Combination" && (
            <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
          )}
        </form>

        {tapValue === "Combination" &&
          isCombination &&
          variantTitle.length > 0 && (
            <div className="px-6">
              {/* {variants?.length >= 0 && ( */}
              {isCombination && (
                <TableContainer className="md:mb-32 mb-40 rounded-b-lg">
                  <Table>
                    <TableHeader>
                      <tr>
                        <TableCell>{t("Image")}</TableCell>
                        <TableCell>{t("Combination")}</TableCell>
                        <TableCell>{t("Sku")}</TableCell>
                        <TableCell>{t("Barcode")}</TableCell>
                        <TableCell>{t("Price")}</TableCell>
                        <TableCell>{t("SalePrice")}</TableCell>
                        <TableCell>{t("QuantityTbl")}</TableCell>
                        <TableCell className="text-right">
                          {t("Action")}
                        </TableCell>
                      </tr>
                    </TableHeader>

                    <AttributeListTable
                      lang={language}
                      variants={variants}
                      setTapValue={setTapValue}
                      variantTitle={variantTitle}
                      isBulkUpdate={isBulkUpdate}
                      handleSkuBarcode={handleSkuBarcode}
                      handleEditVariant={handleEditVariant}
                      handleRemoveVariant={handleRemoveVariant}
                      handleQuantityPrice={handleQuantityPrice}
                      handleSelectInlineImage={handleSelectInlineImage}
                    />
                  </Table>
                </TableContainer>
              )}
            </div>
          )}
      </Scrollbars>
    </>
  );
};

export default React.memo(ProductDrawer);
