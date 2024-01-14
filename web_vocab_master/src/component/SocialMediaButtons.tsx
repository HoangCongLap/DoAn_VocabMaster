"use client";

import { EmailIcon } from "@chakra-ui/icons";
import { FaTwitter, FaFacebook } from "react-icons/fa";

export default function SocialMediaButtons() {
  return (
    <ul
      style={{
        listStyle: "none",
        display: "flex",
        gap: "30px",
        justifyContent: "center",
        fontSize: "30px",
      }}
    >
      <li>
        <EmailIcon />
      </li>
      <li>
        <FaFacebook />
      </li>
      <li>
        <FaTwitter />
      </li>
    </ul>
  );
}
