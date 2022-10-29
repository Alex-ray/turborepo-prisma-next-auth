
import { useEffect, useState } from "react";
import colors from "tailwindcss/colors";

function UserAvatar (props) {
    const {
        image,
        name,
    } = props;

    const letter = name && name.length > 1 ? name[0] : "A";

    const [color, setColor] = useState();

    useEffect(() => {
        const actualColors = Object.keys(colors).filter(key => colors[key] && colors[key]["500"]);
        let charCode = name.charCodeAt(0);

        while (charCode > actualColors.length) {
            charCode = Math.floor(charCode / 5);
        }

        const color = actualColors[charCode];

        setColor(color);
    }, [name]);

    return (
        <div className={`inline-flex items-center justify-center h-9 w-9 rounded-full bg-${color}-500 uppercase`}>
            {letter}
        </div> 
    );
};

UserAvatar.defaultProps = {
    name: "A",
};

export default UserAvatar;