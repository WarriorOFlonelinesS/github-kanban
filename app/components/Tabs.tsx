import { useState, useRef, useEffect } from "react";
import { TabContent } from "./TabContent";

export const Tabs = () => {
  const [active, setActive] = useState(0);
  const [lineStyle, setLineStyle] = useState({});
  const items = [
    { title: 'Tasks', content: '' },
    { title: 'Projects', content: '' },
  ];

  const tabRefs = useRef([]);

  const updateLineStyle = () => {
    const currentTabRef = tabRefs.current[active];
  
    if (currentTabRef) {
      const { offsetLeft, offsetWidth } = currentTabRef;
      const isOffsetWidthEqual44 = offsetWidth === 44;
      const leftPosition = offsetLeft + (isOffsetWidthEqual44 ? 1 : 0);
      const widthValue = isOffsetWidthEqual44 ? offsetWidth - 1 : offsetWidth;
  
      setLineStyle({
        left: leftPosition,
        width: widthValue,
      });
    }
  };
  

  useEffect(() => {
    updateLineStyle();
    window.addEventListener("resize", updateLineStyle);
    return () => window.removeEventListener("resize", updateLineStyle);
  }, [active]);

  const openTab = (index: number) => setActive(index);

  return (
    <>
      <div className="relative flex justify-center ">
        {items.map((n, i) => (
          <button
            key={i + 1}
            ref={el => tabRefs.current[i] = el}
            className={`transition-all duration-700 mx-3 p-0 ${i === active ? 'text-[#6a57ff] font-medium' : ''}`}
            onClick={() => openTab(i)}
          >
            {n.title}

          </button>

        ))}
        <span
          className="bg-[#6a57ff] h-[1px] absolute bottom-0 transition-all duration-500 box-border"
          style={lineStyle}
        />
      </div>
      {items[active] && <TabContent {...items[active]} />}

    </>
  );
};
