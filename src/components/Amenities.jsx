import { CgGym } from "react-icons/cg";
import { GiMusicalScore } from "react-icons/gi";
import { FaSwimmingPool } from "react-icons/fa";
import { TbSettingsAutomation } from "react-icons/tb";
import { PiWineLight } from "react-icons/pi";
import { GiGrass } from "react-icons/gi";
import { TbToolsKitchen } from "react-icons/tb";
import { IoLibraryOutline } from "react-icons/io5";
import { BiCloset } from "react-icons/bi";
import { LuGalleryHorizontal } from "react-icons/lu";
import { PiElevator } from "react-icons/pi";
import { MdOutlineSportsBasketball } from "react-icons/md";
import { MdOutlinePets } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { GrShieldSecurity } from "react-icons/gr";
import { GoSun } from "react-icons/go";
import { TbBrandDrops } from "react-icons/tb";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { MdInsertEmoticon } from "react-icons/md";

const Amenities = (type) => {
  switch (type) {
    case "gym":
      return <CgGym />;
    case "homeTheater":
      return <GiMusicalScore />;
    case "garden":
      return <GiGrass />;
    case "pool":
      return <FaSwimmingPool />;
    case "automation":
      return <TbSettingsAutomation />;
    case "wineCellar":
      return <PiWineLight />;
    case "kitchen":
      return <TbToolsKitchen />;
    case "library":
      return <IoLibraryOutline />;
    case "closet":
      return <BiCloset />;
    case "gallery":
      return <LuGalleryHorizontal />;
    case "elevator":
      return <PiElevator />;
    case "sports":
      return <MdOutlineSportsBasketball />;
    case "pets":
      return <MdOutlinePets />;
    case "office":
      return <IoHomeOutline />;
    case "beach":
      return <FaUmbrellaBeach />;
    case "security":
      return <GrShieldSecurity />;
    case "sunroom":
      return <GoSun />;
    case "waterfront":
      return <TbBrandDrops />;
    case "paint":
      return <HiOutlinePaintBrush />;
    default:
      return <MdInsertEmoticon />;
  }
};

export default Amenities;
