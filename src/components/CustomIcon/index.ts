import {Icon, Point} from 'leaflet';

const CustomIcon = (color:string, letter:string) => {
    const uri = iconUri(color, letter);
    return new Icon({ iconUrl: uri, iconSize: new Point(25, 25) });
  };
  
  const iconUri = (color: string, letter: string) =>
    encodeURI(
      `data:image/svg+xml,<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><metadata id="metadata1">image/svg+xml</metadata><circle fill="black" cx="50" cy="50" r="50"/><circle fill="${color}" cx="48" cy="48" r="47"/><text color="black" x="50" y="50" font-size="50" font-family="sans-serif" dominant-baseline="middle" text-anchor="middle" font-weight="bold">${letter}</text></svg>`.replace(
        new RegExp("#", "g"),
        "%23"
      )
    );

export default CustomIcon;