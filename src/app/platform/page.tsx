"use client";

import Input from "@/components/Input";
import {
  ArrowLeft,
  CircleArrowOutUpRightIcon,
  Loader2,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Fragment } from "react";

// Define the Product type
type Product = {
  Name: string;
  Referance: number;
  Description: string;
  Image: string;
  Quantity: number;
  Type: string;
  Year: number;
};

const Data: Product[] = [
  // Fixed Assets
  {
    Name: "Industrial Machinery",
    Referance: 1,
    Description:
      "Heavy-duty industrial machinery used for manufacturing processes with long operational lifespan.",
    Image: "/images/pic1.jpg",
    Quantity: 100,
    Type: "Fixed Assets",
    Year: 2018,
  },
  {
    Name: "Automated Assembly Line",
    Referance: 2,
    Description:
      "Fully automated assembly line system with robotic components and conveyor systems.",
    Image: "/images/pic2.jpg",
    Quantity: 15,
    Type: "Fixed Assets",
    Year: 2020,
  },
  {
    Name: "Quality Control Equipment",
    Referance: 3,
    Description:
      "Precision testing and quality control equipment for ensuring product standards.",
    Image: "/images/pic3.jpg",
    Quantity: 0,
    Type: "Fixed Assets",
    Year: 2017,
  },
  {
    Name: "Factory Vehicles",
    Referance: 4,
    Description:
      "Industrial vehicles used for material transport within the factory premises.",
    Image: "/images/pic1.jpg",
    Quantity: 8,
    Type: "Fixed Assets",
    Year: 2019,
  },

  // JIG Holders
  {
    Name: "Standard JIG Holder Type A",
    Referance: 5,
    Description:
      "Standard JIG holder for securing components during assembly and testing processes.",
    Image: "/images/pic2.jpg",
    Quantity: 100,
    Type: "JIG holders",
    Year: 2021,
  },
  {
    Name: "Precision JIG Holder",
    Referance: 6,
    Description:
      "High-precision JIG holder for delicate components requiring exact positioning.",
    Image: "/images/pic3.jpg",
    Quantity: 75,
    Type: "JIG holders",
    Year: 2022,
  },
  {
    Name: "Heavy-Duty JIG Holder",
    Referance: 7,
    Description:
      "Reinforced JIG holder designed for heavy components and high-stress applications.",
    Image: "/images/pic1.jpg",
    Quantity: 0,
    Type: "JIG holders",
    Year: 2018,
  },
  {
    Name: "Adjustable JIG System",
    Referance: 8,
    Description:
      "Versatile JIG holding system with adjustable components for various product sizes.",
    Image: "/images/pic2.jpg",
    Quantity: 50,
    Type: "JIG holders",
    Year: 2020,
  },
  {
    Name: "Automated JIG Holder",
    Referance: 9,
    Description:
      "Automated JIG holding system with programmable positioning for high-volume production.",
    Image: "/images/pic3.jpg",
    Quantity: 25,
    Type: "JIG holders",
    Year: 2019,
  },

  // Packaging
  {
    Name: "Standard Cardboard Boxes",
    Referance: 10,
    Description:
      "Standard cardboard packaging boxes for finished products in various sizes.",
    Image: "/images/pic1.jpg",
    Quantity: 1000,
    Type: "Packaging",
    Year: 2021,
  },
  {
    Name: "Protective Foam Inserts",
    Referance: 11,
    Description:
      "Custom-cut foam inserts for protecting delicate products during shipping.",
    Image: "/images/pic2.jpg",
    Quantity: 500,
    Type: "Packaging",
    Year: 2022,
  },
  {
    Name: "Plastic Wrapping Material",
    Referance: 12,
    Description:
      "Industrial-grade plastic wrapping material for securing pallets and bulk shipments.",
    Image: "/images/pic3.jpg",
    Quantity: 0,
    Type: "Packaging",
    Year: 2017,
  },
  {
    Name: "Shipping Labels",
    Referance: 13,
    Description:
      "Pre-printed shipping labels with company branding and information fields.",
    Image: "/images/pic1.jpg",
    Quantity: 2000,
    Type: "Packaging",
    Year: 2018,
  },
  {
    Name: "Specialty Packaging",
    Referance: 14,
    Description:
      "Premium packaging solutions for high-value products with enhanced protection.",
    Image: "/images/pic2.jpg",
    Quantity: 150,
    Type: "Packaging",
    Year: 2019,
  },
];

export default function () {
  const [Loaded, setLoaded] = useState(false);
  const [Selected, setSelected] = useState("");
  const [selectedSubgroup, setSelectedSubgroup] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [stockFilter, setStockFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();

  // Group products by type and year
  const groupedProducts = Data.reduce((acc, product) => {
    if (!acc[product.Type]) {
      acc[product.Type] = {};
    }
    if (!acc[product.Type][product.Year]) {
      acc[product.Type][product.Year] = [];
    }
    acc[product.Type][product.Year].push(product);
    return acc;
  }, {} as Record<string, Record<number, Product[]>>);

  // Get available years for the selected category
  const getAvailableYears = (type: string) => {
    if (!groupedProducts[type]) return [];
    return Object.keys(groupedProducts[type])
      .map(Number)
      .sort((a, b) => b - a); // Sort years in descending order
  };

  // Get total items count for a year
  const getYearItemCount = (type: string, year: number) => {
    if (!groupedProducts[type] || !groupedProducts[type][year]) return 0;
    return groupedProducts[type][year].length;
  };

  // Get total stock for a year
  const getYearStockCount = (type: string, year: number) => {
    if (!groupedProducts[type] || !groupedProducts[type][year]) return 0;
    return groupedProducts[type][year].reduce((sum, item) => sum + item.Quantity, 0);
  };

  useEffect(() => {
    if (localStorage.getItem("auth-aura") != "Authed") {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setLoaded(true);
    }
  }, []);

  // Navigation breadcrumb component
  const Breadcrumb = () => (
    <div className="flex items-center gap-2 mb-4">
      <button
        className="text-blue-500 hover:text-blue-700 cursor-pointer"
        onClick={() => {
          setSelected("");
          setSelectedSubgroup("");
        }}
      >
        Categories
      </button>
      {Selected && (
        <>
          <span className="text-gray-400">/</span>
          <button
            className="text-blue-500 hover:text-blue-700 cursor-pointer"
            onClick={() => setSelectedSubgroup("")}
          >
            {Selected}
          </button>
        </>
      )}
      {selectedSubgroup && (
        <>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{selectedSubgroup}</span>
        </>
      )}
    </div>
  );

  return Loaded ? (
    <div className="h-full w-full relative overflow-auto">
      <img
        src="/images/bg.png"
        className="absolute left-0 top-0 w-full h-full"
        alt=""
      />
      <div className="w-full px-16 flex relative bg-white py-2 justify-between">
        <img src="/images/logo.png" className="w-30" alt="" />
        <h1 className="text-[#452c8d]">SUMITOMO ELECTRIC GROUP</h1>
      </div>
      <div className="relative w-full justify-between flex px-16 mt-4">
        <div></div>
        <button
          onClick={() => {
            localStorage.clear();
            router.push("/");
          }}
          className="bg-white px-2 py-1 rounded text-black"
        >
          Logout
        </button>
      </div>

      {/* Main Categories View */}
      {Selected == "" ? (
        <div className="flex gap-4 px-16 justify-between pt-64 items-center">
          <div
            onClick={() => {
              setSelected("Fixed Assets");
            }}
            className="p-8 w-full border cursor-pointer h-96 relative flex flex-col overflow-hidden justify-end rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/60 transition-colors"
          >
            <img
              src={"/images/pic1.jpg"}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                mask: "linear-gradient(to top,transparent 23%,black 23%)",
              }}
            ></img>
            <div className="flex justify-between items-end relative">
              <div>
                <h1 className="text-white text-xl font-bold">Fixed Assets</h1>
                <p className="text-white/80 text-sm">
                  {Data.filter(item => item.Type === "Fixed Assets").length} items
                </p>
              </div>
              <button className="cursor-pointer text-white">
                <CircleArrowOutUpRightIcon />
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setSelected("JIG holders");
            }}
            className="p-8 w-full border cursor-pointer h-96 relative flex flex-col overflow-hidden justify-end rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/60 transition-colors"
          >
            <img
              src={"/images/pic2.jpg"}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                mask: "linear-gradient(to top,transparent 23%,black 23%)",
              }}
            ></img>
            <div className="flex justify-between items-end relative">
              <div>
                <h1 className="text-white text-xl font-bold">JIG holders</h1>
                <p className="text-white/80 text-sm">
                  {Data.filter(item => item.Type === "JIG holders").length} items
                </p>
              </div>
              <button className="cursor-pointer text-white">
                <CircleArrowOutUpRightIcon />
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setSelected("Packaging");
            }}
            className="p-8 w-full border cursor-pointer h-96 relative flex flex-col overflow-hidden justify-end rounded-2xl bg-neutral-900/50 hover:bg-neutral-900/60 transition-colors"
          >
            <img
              src={"/images/pic3.jpg"}
              className="absolute top-0 left-0 w-full h-full"
              style={{
                mask: "linear-gradient(to top,transparent 23%,black 23%)",
              }}
            ></img>
            <div className="flex justify-between items-end relative">
              <div>
                <h1 className="text-white text-xl font-bold">Packaging</h1>
                <p className="text-white/80 text-sm">
                  {Data.filter(item => item.Type === "Packaging").length} items
                </p>
              </div>
              <button className="cursor-pointer text-white">
                <CircleArrowOutUpRightIcon />
              </button>
            </div>
          </div>
        </div>
      ) : selectedSubgroup === "" ? (
        /* Subgroup View - Years within selected category */
        <div className="flex relative px-16 flex-col mt-20">
          <Breadcrumb />
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">{Selected}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Select a year to view items from that period
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAvailableYears(Selected).map((year) => {
              const itemCount = getYearItemCount(Selected, year);
              const stockCount = getYearStockCount(Selected, year);
              const sampleProduct = groupedProducts[Selected][year][0];
              
              return (
                <div
                  key={year}
                  onClick={() => setSelectedSubgroup(year.toString())}
                  className="group cursor-pointer bg-white dark:bg-neutral-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={sampleProduct.Image}
                      alt={`${Selected} ${year}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h2 className="text-2xl font-bold">{year}</h2>
                      <p className="text-white/90 text-sm">
                        {itemCount} item{itemCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <CircleArrowOutUpRightIcon className="text-white/80 group-hover:text-white transition-colors" size={20} />
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Total Stock
                      </span>
                      <span className={`text-lg font-bold ${
                        stockCount > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                      }`}>
                        {stockCount} units
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Items available:</span>
                        <span className="font-medium">
                          {groupedProducts[Selected][year].filter(item => item.Quantity > 0).length} / {itemCount}
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${(groupedProducts[Selected][year].filter(item => item.Quantity > 0).length / itemCount) * 100}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Product List View - Items within selected year */
        <div className="flex relative px-16 flex-col mt-20">
          <Breadcrumb />
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              {Selected} - {selectedSubgroup}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Items from {selectedSubgroup}
            </p>
          </div>

          <div className="relative w-full mb-4">
            <Input
              placeholder="Search items..."
              icon={<Search size={18} />}
              type="username"
              value={searchQuery}
              onChange={setSearchQuery}
              passwordStrength={false}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {(() => {
              const filteredData = Data.filter((item) => {
                // Filter by selected category and year
                const typeMatch = item.Type === Selected;
                const yearMatch = item.Year.toString() === selectedSubgroup;

                // Filter by search query if one exists
                const queryMatch = !searchQuery
                  ? true
                  : item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.Referance.toString().includes(searchQuery);

                // Filter by stock status
                const stockMatch =
                  stockFilter === "all"
                    ? true
                    : stockFilter === "inStock"
                    ? item.Quantity > 0
                    : stockFilter === "outOfStock"
                    ? item.Quantity === 0
                    : true;

                return typeMatch && yearMatch && queryMatch && stockMatch;
              });

              return (
                <>
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        {filteredData.length > 0 ? (
                          <span>
                            Found {filteredData.length} item
                            {filteredData.length !== 1 ? "s" : ""}
                          </span>
                        ) : (
                          <span className="text-red-500">
                            No items found matching your search criteria
                          </span>
                        )}
                      </div>

                      {filteredData.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm">Sort by:</span>
                          <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-2 py-1 rounded border dark:bg-neutral-800 dark:border-white/15"
                          >
                            <option value="Name">Name</option>
                            <option value="Referance">Reference</option>
                            <option value="Quantity">Quantity</option>
                          </select>

                          <button
                            onClick={() =>
                              setSortOrder(sortOrder === "asc" ? "desc" : "asc")
                            }
                            className="px-2 py-1 rounded border dark:bg-neutral-800 dark:border-white/15 flex items-center gap-1"
                          >
                            {sortOrder === "asc" ? "A-Z" : "Z-A"}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className={`transition-transform ${
                                sortOrder === "desc" ? "rotate-180" : ""
                              }`}
                            >
                              <path d="m6 9 6 6 6-6" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Stock filter */}
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Availability:</span>
                      <div className="flex gap-1">
                        <button
                          onClick={() => setStockFilter("all")}
                          className={`px-3 py-1 text-sm rounded-md transition-colors ${
                            stockFilter === "all"
                              ? "bg-blue-500 text-white"
                              : "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                          }`}
                        >
                          All
                        </button>
                        <button
                          onClick={() => setStockFilter("inStock")}
                          className={`px-3 py-1 text-sm rounded-md transition-colors ${
                            stockFilter === "inStock"
                              ? "bg-green-500 text-white"
                              : "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                          }`}
                        >
                          In Stock
                        </button>
                        <button
                          onClick={() => setStockFilter("outOfStock")}
                          className={`px-3 py-1 text-sm rounded-md transition-colors ${
                            stockFilter === "outOfStock"
                              ? "bg-red-500 text-white"
                              : "bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700"
                          }`}
                        >
                          Out of Stock
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {filteredData
                      .sort((a, b) => {
                        if (sortBy === "Name") {
                          return sortOrder === "asc"
                            ? a.Name.localeCompare(b.Name)
                            : b.Name.localeCompare(a.Name);
                        } else if (sortBy === "Referance") {
                          return sortOrder === "asc"
                            ? a.Referance - b.Referance
                            : b.Referance - a.Referance;
                        } else if (sortBy === "Quantity") {
                          return sortOrder === "asc"
                            ? a.Quantity - b.Quantity
                            : b.Quantity - a.Quantity;
                        }
                        return 0;
                      })
                      .map((item) => {
                        return (
                          <div
                            key={item.Referance}
                            className={`flex gap-4 p-4 border rounded-lg transition-all hover:shadow-md cursor-pointer ${
                              item.Quantity > 0
                                ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                                : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                            }`}
                            onClick={() => setSelectedProduct(item)}
                          >
                            <div className="relative">
                              <img
                                src={item.Image}
                                className="aspect-square h-36 rounded-md object-cover"
                                alt={item.Name}
                              />
                              <div
                                className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${
                                  item.Quantity > 0
                                    ? "bg-green-500 text-white"
                                    : "bg-red-500 text-white"
                                }`}
                              >
                                {item.Quantity > 0 ? "In Stock" : "Out of Stock"}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Reference: {item.Referance}
                                  </p>
                                  <h1 className="text-xl font-bold mt-1">
                                    {item.Name}
                                  </h1>
                                </div>
                                <div className="text-right">
                                  <div
                                    className={`text-sm font-medium ${
                                      item.Quantity > 0
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
                                    }`}
                                  >
                                    {item.Quantity > 0
                                      ? `${item.Quantity} units`
                                      : "No units available"}
                                  </div>
                                </div>
                              </div>
                              <p className="mt-2 text-gray-600 dark:text-gray-300 line-clamp-2">
                                {item.Description}
                              </p>
                              <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`w-3 h-3 rounded-full ${
                                      item.Quantity > 50
                                        ? "bg-green-500"
                                        : item.Quantity > 0
                                        ? "bg-yellow-500"
                                        : "bg-red-500"
                                    }`}
                                  ></div>
                                  <span className="text-sm">
                                    {item.Quantity > 50
                                      ? "High Stock"
                                      : item.Quantity > 0
                                      ? "Low Stock"
                                      : "Out of Stock"}
                                  </span>
                                </div>
                                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                                  {item.Year}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* Modal for product details */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-2xl p-8 w-[70vw] max-w-4xl relative animate-fade-in max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              &times;
            </button>
            
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Product Image */}
              <div className="lg:w-1/2">
                <img
                  src={selectedProduct.Image}
                  alt={selectedProduct.Name}
                  className="w-full h-80 object-cover rounded-lg border shadow-sm"
                />
              </div>
              
              {/* Product Details */}
              <div className="lg:w-1/2">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold mb-2">
                    {selectedProduct.Name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {selectedProduct.Description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Reference ID
                    </span>
                    <span className="text-lg font-bold">#{selectedProduct.Referance}</span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Category
                    </span>
                    <span className="text-lg font-bold">{selectedProduct.Type}</span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Year
                    </span>
                    <span className="text-lg font-bold">{selectedProduct.Year}</span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                      Stock Quantity
                    </span>
                    <span className={`text-lg font-bold ${
                      selectedProduct.Quantity > 0 
                        ? 'text-green-600 dark:text-green-400' 
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {selectedProduct.Quantity} units
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-6">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                    selectedProduct.Quantity > 50
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : selectedProduct.Quantity > 0
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    <div className={`w-2 h-2 rounded-full mr-2 ${
                      selectedProduct.Quantity > 50
                        ? 'bg-green-500'
                        : selectedProduct.Quantity > 0
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}></div>
                    {selectedProduct.Quantity > 50
                      ? 'High Stock Level'
                      : selectedProduct.Quantity > 0
                      ? 'Low Stock Level'
                      : 'Out of Stock'}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button 
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    onClick={() => {
                      // Add your edit functionality here
                      console.log('Edit product:', selectedProduct);
                    }}
                  >
                    Edit Product
                  </button>
                  <button 
                    className="flex-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
                    onClick={() => {
                      // Add your view history functionality here
                      console.log('View history:', selectedProduct);
                    }}
                  >
                    View History
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Loading Screen */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <Loader2 className="animate-spin mx-auto mb-4 text-blue-500" size={48} />
        <p className="text-gray-600 dark:text-gray-400 text-lg">Loading inventory system...</p>
      </div>
    </div>
  );
}