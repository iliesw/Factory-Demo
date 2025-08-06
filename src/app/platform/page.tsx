"use client";

import Input from "@/components/Input";
import { ArrowLeft, CircleArrowOutUpRightIcon, Loader2, Search } from "lucide-react";
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
    Image:
      "https://factory.ilies.dev/api/files/download/49b14f6ae4a612907da6dac9967a7eba_1754158502057.png",
    Quantity: 100,
    Type: "Fixed Assets",
    Year: 2018
  },
  {
    Name: "Automated Assembly Line",
    Referance: 2,
    Description:
      "Fully automated assembly line system with robotic components and conveyor systems.",
    Image:
      "https://factory.ilies.dev/api/files/download/5578724259e7ead59bd6cc4c8175540a_1754158502474.png",
    Quantity: 15,
    Type: "Fixed Assets",
    Year: 2020
  },
  {
    Name: "Quality Control Equipment",
    Referance: 3,
    Description:
      "Precision testing and quality control equipment for ensuring product standards.",
    Image:
      "https://factory.ilies.dev/api/files/download/76476984dbb2e56a16a0b17b45251552_1754158502465.png",
    Quantity: 0,
    Type: "Fixed Assets",
    Year: 2017
  },
  {
    Name: "Factory Vehicles",
    Referance: 4,
    Description:
      "Industrial vehicles used for material transport within the factory premises.",
    Image:
      "https://factory.ilies.dev/api/files/download/2fdb145fa4505fe24fdabf136d94f210_1754158502465.png",
    Quantity: 8,
    Type: "Fixed Assets",
    Year: 2019
  },
  
  // JIG Holders
  {
    Name: "Standard JIG Holder Type A",
    Referance: 5,
    Description:
      "Standard JIG holder for securing components during assembly and testing processes.",
    Image:
      "https://factory.ilies.dev/api/files/download/49b14f6ae4a612907da6dac9967a7eba_1754158502057.png",
    Quantity: 100,
    Type: "JIG holders",
    Year: 2021
  },
  {
    Name: "Precision JIG Holder",
    Referance: 6,
    Description:
      "High-precision JIG holder for delicate components requiring exact positioning.",
    Image:
      "https://factory.ilies.dev/api/files/download/49b14f6ae4a612907da6dac9967a7eba_1754158502057.png",
    Quantity: 75,
    Type: "JIG holders",
    Year: 2022
  },
  {
    Name: "Heavy-Duty JIG Holder",
    Referance: 7,
    Description:
      "Reinforced JIG holder designed for heavy components and high-stress applications.",
    Image:
      "https://factory.ilies.dev/api/files/download/5578724259e7ead59bd6cc4c8175540a_1754158502474.png",
    Quantity: 0,
    Type: "JIG holders",
    Year: 2018
  },
  {
    Name: "Adjustable JIG System",
    Referance: 8,
    Description:
      "Versatile JIG holding system with adjustable components for various product sizes.",
    Image:
      "https://factory.ilies.dev/api/files/download/76476984dbb2e56a16a0b17b45251552_1754158502465.png",
    Quantity: 50,
    Type: "JIG holders",
    Year: 2020
  },
  {
    Name: "Automated JIG Holder",
    Referance: 9,
    Description:
      "Automated JIG holding system with programmable positioning for high-volume production.",
    Image:
      "https://factory.ilies.dev/api/files/download/2fdb145fa4505fe24fdabf136d94f210_1754158502465.png",
    Quantity: 25,
    Type: "JIG holders",
    Year: 2019
  },
  
  // Packaging
  {
    Name: "Standard Cardboard Boxes",
    Referance: 10,
    Description:
      "Standard cardboard packaging boxes for finished products in various sizes.",
    Image:
      "https://factory.ilies.dev/api/files/download/49b14f6ae4a612907da6dac9967a7eba_1754158502057.png",
    Quantity: 1000,
    Type: "Packaging",
    Year: 2021
  },
  {
    Name: "Protective Foam Inserts",
    Referance: 11,
    Description:
      "Custom-cut foam inserts for protecting delicate products during shipping.",
    Image:
      "https://factory.ilies.dev/api/files/download/49b14f6ae4a612907da6dac9967a7eba_1754158502057.png",
    Quantity: 500,
    Type: "Packaging",
    Year: 2022
  },
  {
    Name: "Plastic Wrapping Material",
    Referance: 12,
    Description:
      "Industrial-grade plastic wrapping material for securing pallets and bulk shipments.",
    Image:
      "https://factory.ilies.dev/api/files/download/5578724259e7ead59bd6cc4c8175540a_1754158502474.png",
    Quantity: 0,
    Type: "Packaging",
    Year: 2017
  },
  {
    Name: "Shipping Labels",
    Referance: 13,
    Description:
      "Pre-printed shipping labels with company branding and information fields.",
    Image:
      "https://factory.ilies.dev/api/files/download/76476984dbb2e56a16a0b17b45251552_1754158502465.png",
    Quantity: 2000,
    Type: "Packaging",
    Year: 2018
  },
  {
    Name: "Specialty Packaging",
    Referance: 14,
    Description:
      "Premium packaging solutions for high-value products with enhanced protection.",
    Image:
      "https://factory.ilies.dev/api/files/download/2fdb145fa4505fe24fdabf136d94f210_1754158502465.png",
    Quantity: 150,
    Type: "Packaging",
    Year: 2019
  },
];

export default function () {
  const [Loaded, setLoaded] = useState(false);
  const [Selected, setSelected] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [stockFilter, setStockFilter] = useState("all"); // "all", "inStock", "outOfStock"
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (localStorage.getItem("auth-aura") != "Authed") {
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      setLoaded(true);
    }
  }, []);
  return Loaded ? (
    <div className="h-full w-full relative overflow-auto">
      <img src="/images/bg.png" className="absolute left-0 top-0 w-full h-full" alt="" />
      <div className="w-full px-16 flex relative bg-white py-2 justify-between">
          <img src="/images/logo.png" className="w-30" alt="" />
          <h1 className="text-[#452c8d]">SUMITOMO ELECTRIC GROUP</h1>
        </div>
      {Selected == "" ? (
        <div className="flex gap-4 px-16 justify-between pt-64 items-center">
          <div
            onClick={() => {
              setSelected("Fixed Assets");
            }}
            className="p-8 w-full border cursor-pointer h-96 relative flex flex-col overflow-hidden justify-end rounded-2xl bg-neutral-900/50"
          >
            <img src={"/images/pic1.jpg"} className="absolute top-0 left-0 w-full h-full" style={{mask:"linear-gradient(to top,transparent 23%,black 23%)"}}></img>
            <div className="flex justify-between items-end relative">
              <div>
                <h1>Fixed Assets</h1>
              </div>
              <button className="cursor-pointer">
                <CircleArrowOutUpRightIcon />
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setSelected("JIG holders");
            }}
            className="p-8 w-full border cursor-pointer h-96 relative flex flex-col overflow-hidden justify-end rounded-2xl bg-neutral-900/50"
          >
            <img src={"/images/pic2.jpg"} className="absolute top-0 left-0 w-full h-full" style={{mask:"linear-gradient(to top,transparent 23%,black 23%)"}}></img>
            <div className="flex justify-between items-end relative">
              <div>
                <h1>JIG holders</h1>
              </div>
              <button className="cursor-pointer">
                <CircleArrowOutUpRightIcon />
              </button>
            </div>
          </div>
          <div
            onClick={() => {
              setSelected("Packaging");
            }}
            className="p-8 w-full border cursor-pointer h-96 relative flex flex-col overflow-hidden justify-end rounded-2xl bg-neutral-900/50"
          >
            <img src={"/images/pic3.jpg"} className="absolute top-0 left-0 w-full h-full" style={{mask:"linear-gradient(to top,transparent 23%,black 23%)"}}></img>
            <div className="flex justify-between items-end relative">
              <div>
                <h1>Packaging</h1>
              </div>
              <button className="cursor-pointer">
                <CircleArrowOutUpRightIcon />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex relative px-16 flex-col mt-20">
            <button className="flex w-fit items-center mb-4 gap-2 cursor-pointer" onClick={() => {
              setSelected("");
            }}><ArrowLeft /> Back</button>
          <div className="relative w-full">
            <Input 
              placeholder="Search" 
              icon={<Search size={18} />} 
              type="username"
              value={searchQuery}
              onChange={setSearchQuery}
              passwordStrength={false}
            ></Input>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            {(() => {
              const filteredData = Data.filter((item) => {
                // First filter by selected category
                const typeMatch = item.Type === Selected;
                
                // Then filter by search query if one exists
                const queryMatch = !searchQuery ? true : (
                  item.Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.Description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  item.Referance.toString().includes(searchQuery)
                );
                
                // Filter by stock status
                const stockMatch = stockFilter === "all" ? true : 
                  stockFilter === "inStock" ? item.Quantity > 0 : 
                  stockFilter === "outOfStock" ? item.Quantity === 0 : true;
                
                return typeMatch && queryMatch && stockMatch;
              });
              
              // Display count of results
              return (
                <>
                  <div className="flex flex-col gap-3 mb-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm">
                        {filteredData.length > 0 ? (
                          <span>Found {filteredData.length} item{filteredData.length !== 1 ? 's' : ''}</span>
                        ) : (
                          <span className="text-red-500">No items found matching your search criteria</span>
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
                            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
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
                              className={`transition-transform ${sortOrder === "desc" ? "rotate-180" : ""}`}
                            >
                              <path d="m6 9 6 6 6-6"/>
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
                          className={`px-3 py-1 text-sm rounded-md ${stockFilter === "all" ? "bg-blue-500 text-white" : "bg-neutral-200 dark:bg-neutral-800"}`}
                        >
                          All
                        </button>
                        <button 
                          onClick={() => setStockFilter("inStock")} 
                          className={`px-3 py-1 text-sm rounded-md ${stockFilter === "inStock" ? "bg-green-500 text-white" : "bg-neutral-200 dark:bg-neutral-800"}`}
                        >
                          In Stock
                        </button>
                        <button 
                          onClick={() => setStockFilter("outOfStock")} 
                          className={`px-3 py-1 text-sm rounded-md ${stockFilter === "outOfStock" ? "bg-red-500 text-white" : "bg-neutral-200 dark:bg-neutral-800"}`}
                        >
                          Out of Stock
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                  {filteredData
                    .sort((a, b) => {
                      // Handle different types of sorting
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
                        className={`flex gap-4 p-4 border rounded-md ${
                          item.Quantity > 0 ? "bg-green-500/10" : "bg-red-500/10"
                        } cursor-pointer`}
                        onClick={() => setSelectedProduct(item)}
                      >
                        <div className="relative">
                          <img src={item.Image} className="aspect-square h-36 rounded-md object-cover" alt="" />
                          <div className={`absolute top-2 right-2 px-2 py-1 rounded-md text-xs font-medium ${
                            item.Quantity > 0 ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          }`}>
                            {item.Quantity > 0 ? "In Stock" : "Out of Stock"}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-gray-500 dark:text-gray-400">Reference: {item.Referance}</p>
                              <h1 className="text-xl font-bold mt-1">{item.Name}</h1>
                            </div>
                            <div className="text-right">
                              <div className={`text-sm font-medium ${
                                item.Quantity > 0 ? "text-green-500" : "text-red-500"
                              }`}>
                                {item.Quantity > 0 ? `${item.Quantity} units` : "No units available"}
                              </div>
                            </div>
                          </div>
                          <p className="mt-2 text-gray-600 dark:text-gray-300">{item.Description}</p>
                          <div className="mt-4 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${
                                item.Quantity > 50 ? "bg-green-500" : 
                                item.Quantity > 0 ? "bg-yellow-500" : 
                                "bg-red-500"
                              }`}></div>
                              <span className="text-sm">
                                {item.Quantity > 50 ? "High Stock" : 
                                 item.Quantity > 0 ? "Low Stock" : 
                                 "Out of Stock"}
                              </span>
                            </div>
                            
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-lg p-8  w-[70vw] relative animate-fade-in">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-2xl"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="flex flex-col items-center mb-6">
              <img src={selectedProduct.Image} alt={selectedProduct.Name} className="w-40 h-40 object-cover rounded-md mb-2 border" />
              <h2 className="text-2xl font-bold mb-2 text-center">{selectedProduct.Name}</h2>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <span className="font-semibold mb-1">Reference</span>
                <span>{selectedProduct.Referance}</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <span className="font-semibold mb-1">Type</span>
                <span>{selectedProduct.Type}</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <span className="font-semibold mb-1">Quantity</span>
                <span>{selectedProduct.Quantity}</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center">
                <span className="font-semibold mb-1">Year</span>
                <span>{selectedProduct.Year}</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center col-span-4">
                <span className="font-semibold mb-1">Description</span>
                <span className="text-center">{selectedProduct.Description}</span>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center col-span-4">
                <span className="font-semibold mb-1">Status</span>
                <span className={selectedProduct.Quantity > 0 ? "text-green-600" : "text-red-600"}>
                  {selectedProduct.Quantity > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="w-full h-screen flex items-center justify-center">
      <Loader2 className="animate-spin"></Loader2>
    </div>
  );
}
