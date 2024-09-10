import { motion } from 'framer-motion';

export const AnimatedLoader = () => (
    <motion.div
      className="h-screen w-screen flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 2.5, duration: 1, ease: 'easeOut' }}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg" width="501" height="143" viewBox="0 0 501 143"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <defs>
          <mask id="fill-mask">
            <motion.rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="white"
              initial={{ height: 0 }}
              animate={{ height: '100%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </mask>
        </defs>

        <motion.path
          fill="#B3B3B3"
          mask="url(#fill-mask)"
          d="M147.535 136.443C147.022 136.443 146.565 135.987 146.565 135.473V16.8203C146.565 16.3069 147.022 15.8506 147.535 15.8506C148.049 15.8506 148.505 16.3069 148.505 16.8203V135.473C148.505 135.987 148.049 136.443 147.535 136.443Z"
        />
        <motion.path
          d="M0.131836 26.2898V29.142L26.3153 36.9572V129.141H40.2913V26.2898H0.131836Z"
          fill="none"
          stroke="#050C56"
          strokeWidth="2"
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        <motion.path
          d="M100.874 1.76138C101.73 0.563439 100.589 -0.178142 99.5624 1.0198C84.3885 18.6466 53.9836 57.8934 47.4235 92.2343C45.8833 100.163 45.484 107.522 47.1383 114.881C48.7926 122.24 54.2118 130.112 65.4496 130.454C84.4455 131.082 99.8476 109.119 111.542 77.6879C111.77 77.1174 111.028 76.7181 110.743 77.2885C97.851 104.214 77.3149 121.783 66.3053 116.535C48.1651 107.865 69.5568 47.283 100.874 1.81842V1.76138Z"
          fill="none"
          stroke="#F32409"
          strokeWidth="2"
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
        ;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M230.884 129.142V97.8247H238.813V100.791C241.779 98.11 245.43 97.1973 249.081 97.1973C256.382 97.1973 262.087 101.818 262.087 110.545V129.142H254.158V113.626C254.158 108.492 252.161 105.069 246.799 105.069C241.437 105.069 238.813 108.777 238.813 113.626V129.142H230.884Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg" d="M265.567 129.141V97.8237H273.496V129.141H265.567Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M463.341 97.8227L453.016 134.616L452.046 137.981C451.305 140.548 449.023 142.26 446.342 142.26H436.587V134.559H444.003C444.573 134.559 445.03 134.159 445.201 133.646L446.456 129.082H440.067L430.997 97.7656H439.382L446.969 125.261H447.483L455.241 97.7656H463.284L463.341 97.8227Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M323.746 97.3115C331.219 97.3115 339.091 101.305 339.091 113.683C339.091 114.482 339.091 115.337 338.977 116.649H316.216C317.129 119.73 319.696 122.068 326.085 122.068C329.565 122.068 334.47 120.813 337.779 118.874V126.746C332.702 129.028 329.622 129.712 325.229 129.712C315.133 129.712 308.116 124.35 308.116 113.512C308.116 102.674 315.646 97.3115 323.689 97.3115H323.746ZM330.991 110.317C330.762 108.036 328.652 104.955 323.689 104.955C319.867 104.955 316.787 106.781 316.045 110.317H330.991Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M342.802 129.141V97.8246H350.731V100.677C352.442 98.5661 355.465 97.083 359.515 97.083C361.74 97.083 363.109 97.4253 363.965 97.6534V106.438C362.71 105.411 360.599 104.67 358.66 104.67C355.237 104.67 350.731 106.552 350.731 111.401V129.141H342.802Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M380.276 97.1973C385.581 97.1973 390.372 99.0797 392.426 100.392V108.435C386.094 104.499 373.944 103.757 373.944 107.066C373.944 108.15 375.142 108.777 379.705 109.747L382.386 110.317C390.087 111.972 393.624 114.653 393.624 120.414C393.624 126.175 389.288 129.883 379.534 129.883C373.659 129.883 368.525 128.286 365.729 126.289V117.79C368.353 119.387 373.773 122.011 380.104 122.353C383.812 122.582 385.467 121.669 385.467 120.3C385.467 118.931 383.641 118.246 379.648 117.448L377.766 117.048C370.008 115.508 365.901 112.77 365.901 107.123C365.901 100.449 372.118 97.1973 380.276 97.1973Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg" d="M404.58 97.8245H396.651V129.141H404.58V97.8245Z" stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M396.651 86.1309H405.151C405.151 90.8084 401.329 94.6303 396.651 94.6303V86.1309Z" stroke="#F32409" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M414.617 105.354H408.057V97.824H414.617V88.5259H422.546V97.824H429.106V105.354H422.546V129.141H414.617V105.354Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M218.899 86.0166V111.287C218.899 117.219 214.906 121.669 208.859 121.669C202.813 121.669 198.82 117.219 198.82 111.287V86.0166H190.776V112.998C190.776 116.307 191.632 119.273 193.4 121.783C195.169 124.35 197.45 126.346 200.303 127.772C207.661 131.423 214.735 129.084 217.359 127.772C220.211 126.346 222.55 124.35 224.261 121.783C226.029 119.216 226.885 116.307 226.885 112.998V86.0166H218.842H218.899Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M215.421 70.0405V26.3452H223.464V41.2906C226.43 38.5525 230.195 37.6398 233.846 37.6398C241.262 37.6398 247.08 41.7469 247.08 50.0753V70.0405H239.037V54.3535C239.037 49.1626 237.04 45.6259 231.564 45.6259C226.088 45.6259 223.464 49.3908 223.464 54.3535V70.0405H215.421Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M274.975 67.8766C272.751 69.702 269.385 70.7288 265.62 70.7288C257.976 70.7288 250.104 65.1955 250.104 54.1862C250.104 43.1768 257.919 37.6436 265.734 37.6436C269.385 37.6436 272.751 38.6133 274.975 40.3816V38.3281H283.019V70.1013H274.975V67.9336V67.8766ZM266.818 62.8568C271.439 62.8568 275.318 59.5482 275.318 54.1291C275.318 48.71 271.439 45.4015 266.818 45.4015C262.198 45.4015 258.319 48.71 258.319 54.1291C258.319 59.5482 262.198 62.8568 266.818 62.8568Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M286.612 70.0422V38.269H294.655V41.2353C297.622 38.4972 301.387 37.5845 305.037 37.5845C312.453 37.5845 318.271 42.262 318.271 51.1038V69.9852H310.228V54.2982C310.228 49.1072 308.232 45.5706 302.756 45.5706C297.279 45.5706 294.655 49.3354 294.655 54.2982V69.9852H286.612V70.0422Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M212.798 26.2896V34.1045H198.88V69.9848H190.722V34.1045H176.804V26.2896H212.798Z" stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg" d="M368.36 26.2896H376.518V62.0558H395.741V69.9848H368.36V26.2896Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M433.56 70.042V38.2687H441.603V41.235C444.569 38.4969 448.334 37.5842 451.985 37.5842C459.4 37.5842 465.219 42.2618 465.219 51.1035V69.9849H457.176V54.298C457.176 49.107 455.179 45.5703 449.703 45.5703C444.227 45.5703 441.603 49.3352 441.603 54.298V69.9849H433.56V70.042Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M308.116 97.8799L299.274 129.197H284.899L275.829 97.8799H284.214L291.801 125.375H292.315L300.073 97.8799H308.116Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M340.573 83.9058H325.399V76.262H338.577C344.338 76.319 346.106 75.4063 346.106 69.9301V67.8766C343.882 69.702 340.801 70.7288 337.036 70.7288C329.393 70.7288 321.521 65.1955 321.521 54.1862C321.521 43.1768 329.335 37.6436 337.15 37.6436C340.801 37.6436 343.939 38.6133 346.106 40.3816V38.3281H354.149V70.2724C354.149 81.0536 350.27 83.9628 340.63 83.9058H340.573ZM338.177 62.8568C342.798 62.8568 346.677 59.5482 346.677 54.1291C346.677 48.71 342.798 45.4015 338.177 45.4015C333.557 45.4015 329.678 48.71 329.678 54.1291C329.678 59.5482 333.557 62.8568 338.177 62.8568Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M397.339 54.1271C397.339 43.1177 405.439 37.5845 414.053 37.5845C422.666 37.5845 430.766 43.1177 430.766 54.1271C430.766 65.1365 422.666 70.6697 414.053 70.6697C405.439 70.6697 397.339 65.1365 397.339 54.1271ZM414.053 62.8547C418.673 62.8547 422.552 59.5462 422.552 54.1271C422.552 48.7079 418.673 45.3994 414.053 45.3994C409.432 45.3994 405.553 48.7079 405.553 54.1271C405.553 59.5462 409.432 62.8547 414.053 62.8547Z"
          stroke="black" />;
        <motion.path
          initial={{ strokeDasharray: 400, strokeDashoffset: 400 }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          xmlns="http://www.w3.org/2000/svg"
          d="M487.35 83.9058H472.177V76.262H485.354C491.115 76.319 492.884 75.4063 492.884 69.9301V67.8766C490.659 69.702 487.579 70.7288 483.814 70.7288C476.17 70.7288 468.298 65.1955 468.298 54.1862C468.298 43.1768 476.113 37.6436 483.928 37.6436C487.579 37.6436 490.716 38.6133 492.884 40.3816V38.3281H500.927V70.2724C500.927 81.0536 497.048 83.9628 487.407 83.9058H487.35ZM484.955 62.8568C489.575 62.8568 493.454 59.5482 493.454 54.1291C493.454 48.71 489.575 45.4015 484.955 45.4015C480.334 45.4015 476.455 48.71 476.455 54.1291C476.455 59.5482 480.334 62.8568 484.955 62.8568Z"
          stroke="black" />;
      </motion.svg>
    </motion.div>
  )
;

