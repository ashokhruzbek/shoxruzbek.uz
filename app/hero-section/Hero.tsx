import Link from "next/link";
import Image from "next/image";
import { monaSans } from "../fonts/monaSans";
import { motion } from "framer-motion";
import { imageAnimation, bodyAnimation } from "../animations/animations";
import AnimatedWords from "../animations/AnimatedWords";
import profile from "../../public/main-logo.png";
import {
  FaGithub,
  FaTelegramPlane,
  FaInstagram,
  FaLinkedin,
  FaInstagramSquare,
  FaCode,
} from "react-icons/fa";

const Hero = () => {
  return (
    <motion.section
      className="relative z-10 flex h-[85vh] w-full items-stretch justify-center bg-[url('.//../public/hero.jpg')] bg-cover  bg-center py-0 sm:h-[90vh]  md:h-[100vh] 3xl:h-[85vh]"
      id="home"
      initial="initial"
      animate="animate"
    >
      <motion.div className="absolute left-0 top-0 right-0 bottom-0 h-full w-full bg-[#0E1016] mix-blend-color"></motion.div>

      <div className="absolute top-10 flex justify-between sm:w-[90%] lg:max-w-[1440px]">
        <div>
          <Link
            href="https://cal.com/ashokhruzbek/30min"
            target="_blank"
            aria-label="BOOK A CALL"
          >
            <motion.button
              className="hidden rounded-md border-2 border-[#e4ded7] py-2 px-4 text-[14px] font-semibold text-[#e4ded7] sm:block  md:text-[16px] lg:block"
              variants={bodyAnimation}
            >
              BOOK A CALL
            </motion.button>
          </Link>
        </div>

        <div className="flex gap-10 text-[#e4ded7] sm:gap-12 md:gap-14 lg:gap-14">
          <Link
            href="https://github.com/ashokhruzbek"
            target="_blank"
            aria-label="View GitHub Profile"
          >
            <motion.div className="text-[22px]" variants={bodyAnimation}>
              <FaGithub />
            </motion.div>
          </Link>

          <Link
            href="https://t.me/ashokhruzbek"
            target="_blank"
            aria-label="View Telegram Profile"
          >
            <motion.div className="text-[22px]" variants={bodyAnimation}>
              <FaTelegramPlane />
            </motion.div>
          </Link>

          <Link
            href="https://linkedin.com/in/shokhruzbek"
            target="_blank"
            aria-label="View LinkedIn Profile"
          >
            <motion.div className="text-[22px]" variants={bodyAnimation}>
              <FaLinkedin />
            </motion.div>
          </Link>

          <Link
            href="https://instagram.com/a.shokhruzbek"
            target="_blank"
            aria-label="View Instagram Profile"
          >
            <motion.div className="text-[22px]" variants={bodyAnimation}>
              <FaInstagram />
            </motion.div>
          </Link>
        </div>
      </div>

      <div className="-mt-36 flex flex-col items-center justify-center sm:-mt-20 lg:my-40 lg:-mt-2 lg:py-40 ">
        <div
          className={`relative flex flex-col items-center justify-center ${monaSans.className}`}
        >
          <AnimatedWords
            title="shoxruzbek"
            style="inline-block overflow-hidden pt-1 -mr-4 sm:-mr-5 md:-mr-7 lg:-mr-9 -mb-1 sm:-mb-2 md:-mb-3 lg:-mb-4"
          />
          <motion.div
            className="absolute bottom-[-110px] mx-auto sm:bottom-[-100px] md:bottom-[-130px] lg:bottom-[-150px]"
            variants={imageAnimation}
          >
            <Image
              src={profile}
              priority
              alt="Shoxruzbek's headshot"
              data-blobity-tooltip="Shoxruzbek Abduraxmonov"
              data-blobity-invert="false"
              className=" mb-[-115px] w-[150px] rounded-[16px] grayscale hover:grayscale-0 md:mb-[-115px] md:w-[200px] md:rounded-[32px] lg:w-[245px]"
            />
          </motion.div>
        </div>
      </div>

      <div
        className="absolute bottom-10 flex items-center 
      justify-center
      md:bottom-10 lg:w-[90%] lg:max-w-[1440px] lg:justify-between"
      >
        <motion.div
          className="  max-w-[350px] md:max-w-[400px] lg:max-w-[400px]"
          variants={bodyAnimation}
        >
          <p className="z-50 text-center text-[16px] font-medium text-[#e4ded7] md:text-[20px] lg:text-left">
            Full Stack Developer & Student of{" "}
            <Link
              href="https://university.pdp.uz/uz"
              target="_blank"
              className="underline underline-offset-2 hover:no-underline"
              aria-label="PDP University Website"
            >
              PDP University,
            </Link>{" "}
            currently available for work.
          </p>
        </motion.div>

        <motion.div
          className="  hidden max-w-[500px] lg:block lg:max-w-[420px]"
          variants={bodyAnimation}
        >
          <p className="text-right text-[16px] font-semibold text-[#e4ded7] md:text-[20px]">
            Focused on interfaces and experiences, working remotely from
            Khorezm, Uzbekistan..
          </p>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
