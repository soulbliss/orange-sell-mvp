import React from 'react';


const HeaderUser = ({ userType }) => {

    const OrangeHeader = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#ff5500" fill-opacity="1" d="M0,224L60,197.3C120,171,240,117,360,128C480,139,600,213,720,245.3C840,277,960,267,1080,229.3C1200,192,1320,128,1380,96L1440,64L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
    }

    const BlueHeader = () => {
        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path fill="#0099ff" fill-opacity="1" d="M0,96L48,128C96,160,192,224,288,218.7C384,213,480,139,576,128C672,117,768,171,864,186.7C960,203,1056,181,1152,160C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
        </svg>
    }

    return (
        <div>

            {userType === "seller" ? <OrangeHeader /> : <BlueHeader />}

        </div>

    );
}

export default HeaderUser;