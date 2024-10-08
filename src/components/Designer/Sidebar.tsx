import React, { useState, useEffect } from "react";
import LogoPicker from "./LogoPicker";
import QuantitySelector from "./QuantitySelector";
import Tooltip from "./ToolTip";
import Image from "next/image";

interface SidebarProps {
  activeSidebar: string | null;
  toggleSidebar: (sidebar: string) => void;
  handleLogoSelect: (
    leftLogoId: string,
    rightLogoId: string,
    fullLogoId: string
  ) => void;
  handleBackgroundColorSelect: (color: string) => void;
  handleStripeColorSelect: (color: string) => void;
  handleTemplateChange: (selectedValue: number) => void;
  selectedTemplate: number;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onQuantityBlur: () => void;
  className?: string;
}

const presetColors = [
  "#767676",
  "#F1EB9C",
  "#E9EC6B",
  "#FEDD00",
  "#FFCD00",
  "#FFB81C",
  "#FF8200",
  "#FF8674",
  "#FE5000",
  "#F9423A",
  "#E4002B",
  "#A6192E",
  "#8E1E1E",
  "#D50032",
  "#6C1D45",
  "#CE0058",
  "#FABBCB",
  "#E31C79",
  "#9678D3",
  "#582C83",
  "#D48BC8",
  "#93328E",
  "#6A3460",
  "#005A6F",
  "#008C96",
  "#6ECEB2",
  "#8BB8E8",
  "#004C97",
  "#171C8F",
  "#003865",
  "#BDD6E6",
  "#8DC8E8",
  "#5BC2E7",
  "#00B2A9",
  "#0057B7",
  "#051C2C",
  "#000000",
  "#FFFFFF",
];

const Sidebar: React.FC<SidebarProps> = ({
  activeSidebar,
  toggleSidebar,
  handleLogoSelect,
  handleBackgroundColorSelect,
  handleStripeColorSelect,
  handleTemplateChange,
  selectedTemplate,
  quantity,
  onQuantityChange,
  onQuantityBlur,
  className,
}) => {
  const templates = [
    { id: 1, image: "/sock-1.png" },
    { id: 2, image: "/sock-2.png" },
    { id: 3, image: "/sock-3.png" },
    { id: 4, image: "/sock-4.png" },
    { id: 5, image: "/sock-5.png" },
    { id: 6, image: "/sock-6.png" },
  ];

  const [showBackgroundColors, setShowBackgroundColors] = useState(false);
  const [showStripeColors, setShowStripeColors] = useState(false);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState<
    string | null
  >(null);
  const [selectedStripeColor, setSelectedStripeColor] = useState<string | null>(
    null
  );

  const handleColorSelect = (color: string, type: string) => {
    if (type === "background") {
      handleBackgroundColorSelect(color);
      setSelectedBackgroundColor(color);
    } else if (type === "stripe") {
      handleStripeColorSelect(color);
      setSelectedStripeColor(color);
    }
  };

  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState("");
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const toggleTooltip = (
    message: string,
    position: { top: number; left: number }
  ) => {
    setTooltipMessage(message);
    setTooltipPosition(position);
    setTooltipVisible(!tooltipVisible);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (tooltipVisible) {
        setTooltipVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [tooltipVisible]);

  const handleInfoClick = (event: React.MouseEvent, message: string) => {
    event.stopPropagation();
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    toggleTooltip(message, {
      top: rect.bottom + window.scrollY,
      left: rect.right + window.scrollX,
    });
  };

  return (
    <div className={`flex relative overflow-hidden ${className}`}>
      {/* Main Sidebar */}
      <div className="w-20 bg-white text-black flex flex-col items-center py-4 shadow-xl fixed top-0 left-0 h-full z-10">
        {[
          { name: "design", icon: "/icons/pattern.svg" },
          { name: "colour", icon: "/icons/bucket.svg" },
          { name: "logo", icon: "/icons/export.svg" },
          { name: "quantity", icon: "/icons/add.svg" },
        ].map((item) => (
          <button
            key={item.name}
            className="mb-4 p-2 bg-white text-black hover:bg-blue-100 focus:outline-none flex flex-col items-center group w-full"
            onClick={() => toggleSidebar(item.name)}
          >
            <Image
              src={item.icon}
              alt={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
              width={20}
              height={20}
              className="sidebar-icon group-hover:fill-current text-blue-500"
            />
            <span className="mt-2 font-semibold group-hover:text-blue-500 w-full text-center">
              {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
            </span>
          </button>
        ))}
      </div>

      {/* Nested Sidebar */}
      {activeSidebar && (
        <div className="w-64 bg-white h-full shadow-xl fixed top-0 left-20 z-10 overflow-auto">
          {activeSidebar === "design" && (
            <div className="p-4 relative">
              <div className="mb-2 flex items-center">
                <h1 className="text-xl">Select Design</h1>
                <button
                  onClick={(e) =>
                    handleInfoClick(e, "Choose a standard design for your sock")
                  }
                >
                  <Image
                    src="info-icon.svg"
                    alt="Info Icon"
                    width={16}
                    height={16}
                    className="ml-2"
                  />
                </button>
              </div>
              <Tooltip
                message={tooltipMessage}
                isVisible={tooltipVisible}
                position={tooltipPosition}
              />
              <div className="grid grid-cols-2 gap-2 overflow-auto max-h-96">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-1 border-2 ${
                      selectedTemplate === template.id
                        ? "border-blue-500"
                        : "border-gray-300"
                    } cursor-pointer`}
                    onClick={() => handleTemplateChange(template.id)}
                  >
                    <Image
                      src={template.image}
                      alt={`Template ${template.id}`}
                      width={100}
                      height={100}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeSidebar === "colour" && (
            <div className="p-4 relative">
              <div className="mb-2 flex items-center">
                <h1 className="text-xl">Select Colour</h1>
                <button
                  onClick={(e) =>
                    handleInfoClick(
                      e,
                      "Click on the button to change the sock colour."
                    )
                  }
                >
                  <Image
                    src="info-icon.svg"
                    alt="Info Icon"
                    width={16}
                    height={16}
                    className="ml-2"
                  />
                </button>
              </div>
              <Tooltip
                message={tooltipMessage}
                isVisible={tooltipVisible}
                position={tooltipPosition}
              />
              <div className="flex flex-col space-y-4">
                <button
                  className="p-2 border border-gray-300 rounded bg-white text-black hover:bg-blue-100 transition duration-300"
                  onClick={() => {
                    setShowBackgroundColors(!showBackgroundColors);
                    setShowStripeColors(false);
                  }}
                >
                  Background Colour
                </button>
                {showBackgroundColors && (
                  <div className="flex overflow-x-scroll space-x-2 py-2">
                    {presetColors.map((color) => (
                      <div
                        key={color}
                        className="flex flex-col items-center relative"
                      >
                        <button
                          className="w-10 h-10 rounded-full border-2 border-gray-300"
                          style={{ backgroundColor: color }}
                          onClick={() => handleColorSelect(color, "background")}
                        />
                        {selectedBackgroundColor === color && (
                          <div className="absolute bottom-0 right-0">
                            <svg
                              className="w-4 h-4 text-white bg-blue-500 rounded-full"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {selectedTemplate !== 1 && (
                  <>
                    <button
                      className="p-2 border border-gray-300 rounded bg-white text-black hover:bg-blue-100 transition duration-300"
                      onClick={() => {
                        setShowStripeColors(!showStripeColors);
                        setShowBackgroundColors(false);
                      }}
                    >
                      Stripe Colour
                    </button>
                    {showStripeColors && (
                      <div className="flex overflow-x-scroll space-x-2 py-2">
                        {presetColors.map((color) => (
                          <div
                            key={color}
                            className="flex flex-col items-center relative"
                          >
                            <button
                              className="w-10 h-10 rounded-full border-2 border-gray-300"
                              style={{ backgroundColor: color }}
                              onClick={() => handleColorSelect(color, "stripe")}
                            />
                            {selectedStripeColor === color && (
                              <div className="absolute bottom-0 right-0">
                                <svg
                                  className="w-4 h-4 text-white bg-blue-500 rounded-full"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {activeSidebar === "logo" && (
            <div className="p-4 relative">
              <div className="mb-2 flex items-center">
                <h1 className="text-xl">Select Logo</h1>
                <button
                  onClick={(e) =>
                    handleInfoClick(
                      e,
                      "Upload or drop a logo, if it's over 500x500 you have to crop it."
                    )
                  }
                >
                  <Image
                    src="info-icon.svg"
                    alt="Info Icon"
                    width={16}
                    height={16}
                    className="ml-2"
                  />
                </button>
              </div>
              <Tooltip
                message={tooltipMessage}
                isVisible={tooltipVisible}
                position={tooltipPosition}
              />
              <LogoPicker
                onLogoSelect={handleLogoSelect}
                cropperHeight="h-48"
              />
            </div>
          )}

          {activeSidebar === "quantity" && (
            <div className="p-4 relative">
              <div className="mb-2 flex items-center">
                <h1 className="text-xl">Select Quantity</h1>
                <button
                  onClick={(e) =>
                    handleInfoClick(
                      e,
                      "Select the quantity of socks you want to order."
                    )
                  }
                >
                  <Image
                    src="info-icon.svg"
                    alt="Info Icon"
                    width={16}
                    height={16}
                    className="ml-2"
                  />
                </button>
              </div>
              <Tooltip
                message={tooltipMessage}
                isVisible={tooltipVisible}
                position={tooltipPosition}
              />
              <QuantitySelector
                quantity={quantity}
                onChange={onQuantityChange}
                onBlur={onQuantityBlur}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
