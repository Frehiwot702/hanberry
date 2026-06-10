"use client";

import { useState } from "react"; 
import { AddPackageRequest, Package } from "@/app/services/package.service";
import { Category } from "@/app/services/category.service";
// import { BookingCategory, BookingCategoryGroup, BookingPackage, NewPackageInput } from "./types";

interface AdminPackagesPanelProps {
  categories: Category[];
  packages: Package[];
  loadingPackages: boolean;
  expandedPackageId: string | null;
  infoMessage: string;
  newCategory: string;
  order: string;
  onNewCategoryChange: (value: string) => void;
  onOrderChange: (value: string) => void;
  onAddCategory: (nameOverride: string, order: string) => Promise<void> | void;
  onEditCategory: (categoryId: string, updates: { name: string; status?: "active" | "inactive", order: number}) => Promise<void> | void;
  onDeleteCategory: (id: string) => Promise<void> | void;
  onAddPackage: (pkg: AddPackageRequest) => Promise<void> | void;
  onEditPackage: (pkgId: string, updates: AddPackageRequest) => Promise<void> | void;
  onDeletePackage: (id: string) => Promise<void> | void;
  onTogglePackage: (id: string | null) => void;
  loading: boolean;
}

export function AdminPackagesPanel({
  categories,
  packages,
  loadingPackages,
  expandedPackageId,
  infoMessage,
  newCategory,
  onNewCategoryChange,
  order,
  onOrderChange,
  onAddCategory,
  onEditCategory,
  onDeleteCategory,
  onAddPackage,
  onEditPackage,
  onDeletePackage,
  onTogglePackage,
  loading
}: AdminPackagesPanelProps) {
  const [showAddPackageModal, setShowAddPackageModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | "">(
    categories[0]?.id ?? "",
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(categories[0]);
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [packageDuration, setPackageDuration] = useState("");
  const [packagePrice, setPackagePrice] = useState("");
  const [packageStatus, setPackageStatus] = useState<"active" | "inactive">("active");
  const [includeDraft, setIncludeDraft] = useState("");
  const [includes, setIncludes] = useState<string[]>([]);
  const [packageOptionalNotes, setPackageOptionalNotes] = useState(""); 
  const [modalType, setModalType] = useState<
    null | "edit-category" | "delete-category" | "edit-package" | "delete-package"
  >(null);

  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [activePackage, setActivePackage] = useState<Package | null>(null);

  const [editNameDraft, setEditNameDraft] = useState("");
  const [editStatus, setEditStatus] = useState<"active" | "inactive">();
  const [editOrder, setEditOrder] = useState(0);

  // const categories = useMemo(
  //   () =>
  //     groupedCategories.map(({ id, name, status }) => ({
  //       id,
  //       name, 
  //       status,
  //     })),
  //   [groupedCategories],
  // );

  function openAddPackageModal() {
    setSelectedCategoryId(categories[0]?.id ?? "");
    setPackageName("");
    setPackageDescription("");
    setPackageDuration("");
    setPackagePrice("");
    setIncludeDraft("");
    setIncludes([]);
    setShowAddPackageModal(true);
  }

  function addInclude() {
    const value = includeDraft.trim();
    if (!value) return;
    setIncludes((prev) => [...prev, value]);
    setIncludeDraft("");
  }

  function removeInclude(index: number) {
    setIncludes((prev) => prev.filter((_, i) => i !== index));
  }

  function openEditCategoryModal(category: Category) {
    setActiveCategory(category);
    setEditNameDraft(category.name);
    setEditStatus(category.status);
    setEditOrder(category.order);
    console.log({category})
    setModalType("edit-category");
  }

  function openDeleteCategoryModal(category: Category) {
    setActiveCategory(category);
    setModalType("delete-category");
  }

  function openEditPackageModal(pkg: Package) {
    setActivePackage(pkg);
    setPackageName(pkg.name);
    setPackageDescription(pkg.description);
    setPackageDuration(pkg.duration);
    setPackagePrice(pkg.price.toLocaleString());
    if(pkg.optional_notes) setPackageOptionalNotes(pkg.optional_notes);
    setIncludes(pkg.includes);
    setSelectedCategoryId(pkg.categoryId);
    setPackageStatus(pkg.status);
    setModalType("edit-package"); 
  }

  function openDeletePackageModal(pkg: Package) {
    setActivePackage(pkg);
    setModalType("delete-package");
  }

  function closeActionModal() {
    setModalType(null);
    setActiveCategory(null);
    setActivePackage(null);
    setEditNameDraft("");
  }

  async function submitNewPackage() {
    if (!selectedCategoryId) return;

    await onAddPackage({
      categoryId: selectedCategoryId,
      category: {
        name: selectedCategory?.name ?? "",
        status: selectedCategory?.status ?? "active"
      },
      status: packageStatus,
      name: packageName, 
      description: packageDescription,
      duration: packageDuration,
      price: Number(packagePrice),
      includes,
      optional_notes: packageOptionalNotes
    });
    setShowAddPackageModal(false);
  }
  console.log({activeCategory})

  async function submitActionModal() {
    if (modalType === "edit-category" && activeCategory) {
      const updates = {name: editNameDraft, status: editStatus, order: editOrder}
      await onEditCategory(activeCategory.id, updates);
      closeActionModal();
      return;
    }
    if (modalType === "delete-category" && activeCategory) {
      await onDeleteCategory(activeCategory.id);
      closeActionModal();
      return;
    }
    if (modalType === "edit-package" && activePackage) {
      const updates = {
        name: packageName,
        description: packageDescription,
        price: Number(packagePrice),
        duration: packageDuration,
        includes,
        optional_notes: packageOptionalNotes,
        categoryId: selectedCategoryId,
        category: {
          name: selectedCategory?.name ?? "",
          status: selectedCategory ? selectedCategory.status : "active"
        },
        status: packageStatus
      }
      await onEditPackage(activePackage.id, updates);
      closeActionModal();
      return;
    }
    if (modalType === "delete-package" && activePackage) {
      await onDeletePackage(activePackage.id);
      closeActionModal();
      return;
    }
  }

  return (
    <section className="mt-12 lg:mx-28">
      <h1 className="text-[30px] font-medium">Package Management</h1>
      <p className=''>Create and update your beauty packages to reflect your latest services.</p>

      <div className="mt-12 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
        <div className="w-full">
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold">Categories</h2>
            {/* <button
              type="button"
              className="text-[26px] leading-none font-semibold"
              onClick={() => onAddCategory("New Category")}
              aria-label="Add category"
            >
              +
            </button> */}
          </div>

          <ul className="mt-6 space-y-6">
            {categories.sort((a, b) => a.order - b.order).map((category) => (
              <li key={category.id} className="flex items-center justify-between text-[20px] leading-none">
                <span className="flex items-center gap-4">
                  <span className="text-xs">•</span>
                  <span>{category.name}</span>
                </span>
                <span className="flex items-center gap-6 text-[14px] text-black/45">
                  <button type="button" onClick={() => openEditCategoryModal(category)} className="hover:text-black/70 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen" viewBox="0 0 16 16">
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"/>
                    </svg>
                  </button>
                  <button type="button" onClick={() => openDeleteCategoryModal(category)} className="hover:text-black/70 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                  </button>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-12 border border-black/40 rounded-xl p-4 space-y-4">
            <h3 className="text-[28px] font-medium">Add new category</h3> 
            <input
              value={newCategory}
              required
              onChange={(e) => onNewCategoryChange(e.target.value)}
              placeholder="Enter category name here"
              className="mt-2 w-full border border-black/50 h-10 px-3 text-xs"
            /> 
            <input
              type='number'
              value={order}
              required
              onChange={(e) => onOrderChange(e.target.value)}
              placeholder="Enter category order here"
              className="mt-2 w-full border border-black/50 h-10 px-3 text-xs"
            /> 
            <button
              type="button"
              onClick={() => onAddCategory(newCategory, order)}
              className="mt-4 w-full h-[42px] bg-black text-white text-[18px] font-medium"
            >
              Add category
            </button>
          </div>
        </div>

        <div className='lg:col-span-2 w-full'>
          <div className="flex items-center justify-between">
            <h2 className="text-[20px] font-semibold">Packages</h2>
            <button type="button" className="text-[26px] leading-none font-semibold" onClick={openAddPackageModal}>
              +
            </button>
          </div>
          {/* <button
            type="button"
            onClick={openAddPackageModal}
            className="mt-4 h-[42px] px-6 bg-black text-white text-[16px] font-medium"
          >
            Add package
          </button> */}

          <div className="mt-3 min-h-[240px]">
            {loadingPackages ? <p className="text-base">Loading...</p> : null}
            {!loadingPackages && packages.length === 0 ? (
              <p className="text-base text-black/60">No packages yet.</p>
            ) : null}
            {!loadingPackages &&
              packages.map((pkg, index) => {
                const expanded = expandedPackageId === pkg.id || (expandedPackageId == null && index === 0);
                return (
                  <div key={pkg.id} className={`${index > 0 ? "mt-4" : ""} rounded-xl bg-[#efefef] p-4`}>
                    <button
                      type="button"
                      onClick={() => onTogglePackage(expanded ? null : pkg.id)}
                      className="w-full flex items-center justify-between text-left"
                    >
                      <span className="text-[24px] font-medium">{pkg.name}</span>
                      <span className="text-[26px] leading-none">{expanded ? "⌃" : "⌄"}</span>
                    </button>
                    {expanded ? (
                      <div className="mt-2 text-[12px] text-black/80 leading-[1.4]">
                        <p>{pkg.description}</p>
                        {pkg.includes.length ? (
                          <ul className="mt-1 list-disc ml-6">
                            {pkg.includes.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        ) : null}
                        <p className="mt-1">Duration: {pkg.duration}</p>
                        <p>Price: {pkg.price.toLocaleString()} ETB</p>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => openEditPackageModal(pkg)}
                            className="h-[42px] bg-black text-white text-[18px] font-medium"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => openDeletePackageModal(pkg)}
                            className="h-[42px] bg-[#ea3a3a] text-white text-[18px] font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      {infoMessage ? <p className="mt-6 text-base text-black/60">{infoMessage}</p> : null}

      {showAddPackageModal ? (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4">
          <div className="w-full max-w-[880px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-4 md:p-8 shadow-xl">

            <h3 className="text-[36px] font-medium">Add new package</h3>

            <select
              className="mt-6 w-[360px] h-[50px] border border-black/40 px-3 text-sm"
              value={selectedCategoryId}
              onChange={(e) => setSelectedCategoryId(e.target.value)}
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id} onClick={() => setSelectedCategory(category)}>
                  {category.name}
                </option>
              ))}
            </select>

            <input
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              placeholder="Enter package name here"
              className="mt-6 w-full h-[50px] border border-black/40 px-3 text-sm"
            />
            <input
              value={packageDescription}
              onChange={(e) => setPackageDescription(e.target.value)}
              placeholder="Enter package description here"
              className="mt-5 w-full h-[50px] border border-black/40 px-3 text-sm"
            />

            <div className="mt-5 grid grid-cols-2 gap-5">
              <input
                value={packageDuration}
                onChange={(e) => setPackageDuration(e.target.value)}
                placeholder="Enter package duration here"
                className="h-[50px] border border-black/40 px-3 text-sm"
              />
              <input
                type="number"
                value={packagePrice}
                onChange={(e) => setPackagePrice(e.target.value)}
                placeholder="Enter package price here"
                className="h-[50px] border border-black/40 px-3 text-sm"
              />
            </div>

            <div className="mt-5 grid ">
              <input
                value={packageOptionalNotes}
                onChange={(e) => setPackageOptionalNotes(e.target.value)}
                placeholder="Enter package optional note here"
                className="h-[50px] border border-black/40 px-3 text-sm"
              /> 
              <select
                className="mt-6 w-[360px] h-[50px] border border-black/40 px-3 text-sm"
                value={packageStatus}
                onChange={(e) => setPackageStatus(e.target.value as "active" | "inactive")}
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <p className="mt-5 text-sm text-black/80">Package includes</p>
            <div className="mt-2 flex items-center gap-4">
              <input
                value={includeDraft}
                onChange={(e) => setIncludeDraft(e.target.value)}
                className="w-[320px] h-[46px] border border-black/40 px-3 text-sm"
              />
              <button type="button" onClick={addInclude} className="h-[46px] px-8 bg-black text-white text-[18px]">
                Add
              </button>
            </div>
            <ul className="mt-4 space-y-1 text-sm text-[#bba4a4]">
              {includes.map((include, index) => (
                <li key={`${include}-${index}`} className="flex items-center gap-2">
                  <span>• {include}</span>
                  <button
                    type="button"
                    className="text-black/60 hover:text-black"
                    onClick={() => removeInclude(index)}
                  >
                    x
                  </button>
                </li>
              ))}
            </ul>

            

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setShowAddPackageModal(false)}
                className="h-[50px] px-8 border border-black/30 text-[20px]"
              >
                Cancel
              </button>
              <button type="button" onClick={submitNewPackage} className="h-[50px] px-8 bg-black text-white text-[20px]">
                {loading ? "adding..." : "Add Package"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {modalType ? (
        <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center px-6">
          <div className="w-full max-w-[560px] rounded-2xl bg-white p-8 shadow-xl">
            <h3 className="text-[30px] font-medium">
              {modalType === "edit-category" && "Edit category"}
              {modalType === "delete-category" && "Delete category"}
              {modalType === "edit-package" && "Edit package"}
              {modalType === "delete-package" && "Delete package"}
            </h3>

            {modalType === "edit-category" ? (
              <div>
                <input
                  value={editNameDraft}
                  onChange={(e) => setEditNameDraft(e.target.value)}
                  className="mt-5 w-full h-[50px] border border-black/40 px-3 text-sm"
                />
                <select
                  value={editStatus}
                  onChange={(e) =>
                    setEditStatus(
                      e.target.value as "active" | "inactive"
                    )
                  }
                  className="mt-5 w-full h-[50px] border border-black/40 px-3 text-sm"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <input
                  value={editOrder}
                  onChange={(e) => setEditOrder(Number(e.target.value))}
                  className="mt-5 w-full h-[50px] border border-black/40 px-3 text-sm"
                />
              </div>
            ) : modalType === "edit-package" ? (
              <div>
                <select
                  className="mt-6 w-[360px] h-[50px] border border-black/40 px-3 text-sm"
                  value={selectedCategoryId}
                  onChange={(e) => setSelectedCategoryId(e.target.value)}
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <input
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  placeholder="Enter package name here"
                  className="mt-6 w-full h-[50px] border border-black/40 px-3 text-sm"
                />
                <input
                  value={packageDescription}
                  onChange={(e) => setPackageDescription(e.target.value)}
                  placeholder="Enter package description here"
                  className="mt-5 w-full h-[50px] border border-black/40 px-3 text-sm"
                />

                <div className="mt-5 grid grid-cols-2 gap-5">
                  <input
                    value={packageDuration}
                    onChange={(e) => setPackageDuration(e.target.value)}
                    placeholder="Enter package duration here"
                    className="h-[50px] border border-black/40 px-3 text-sm"
                  />
                  <input
                    value={packagePrice}
                    onChange={(e) => setPackagePrice(e.target.value)}
                    placeholder="Enter package price here"
                    className="h-[50px] border border-black/40 px-3 text-sm"
                  />
                </div>

                <div className="mt-5 grid ">
                  <input
                    value={packageOptionalNotes}
                    onChange={(e) => setPackageOptionalNotes(e.target.value)}
                    placeholder="Enter package optional note here"
                    className="h-[50px] border border-black/40 px-3 text-sm"
                  /> 
                  <select
                    className="mt-6 w-[360px] h-[50px] border border-black/40 px-3 text-sm"
                    value={packageStatus}
                    onChange={(e) => setPackageStatus(e.target.value as "active" | "inactive")}
                  >
                    <option value="" disabled>
                      Select status
                    </option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <p className="mt-5 text-sm text-black/80">Package includes</p>
                <div className="mt-2 flex items-center gap-4">
                  <input
                    value={includeDraft}
                    onChange={(e) => setIncludeDraft(e.target.value)}
                    className="w-[320px] h-[46px] border border-black/40 px-3 text-sm"
                  />
                  <button type="button" onClick={addInclude} className="h-[46px] px-8 bg-black text-white text-[18px]">
                    Add
                  </button>
                </div>
                <ul className="mt-4 space-y-1 text-sm text-[#bba4a4]">
                  {includes.map((include, index) => (
                    <li key={`${include}-${index}`} className="flex items-center gap-2">
                      <span>• {include}</span>
                      <button
                        type="button"
                        className="text-black/60 hover:text-black"
                        onClick={() => removeInclude(index)}
                      >
                        x
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-5 text-sm text-black/70">
                Are you sure you want to delete{" "}
                {modalType === "delete-category" ? activeCategory?.name : activePackage?.name}?
              </p>
            )}

            <div className="mt-6 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={closeActionModal}
                className="h-[46px] px-6 border border-black/30 text-[16px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitActionModal}
                className={`h-[46px] px-6 text-[16px] text-white ${
                  modalType?.includes("delete") ? "bg-[#ea3a3a]" : "bg-black"
                }`}
              >
                {loading ? "loading..." : modalType?.includes("delete") ? "Delete" : "Save"}
              </button>
            </div>
          </div>
        </div>
      ) : null}


    </section>
  );
}
