const midpoint = (lat1, lng1, lat2, lng2) => {
  const rad = (Math.PI) / 180;
  const rlat1 = lat1 * rad;
  const rlng1 = lng1 * rad;
  const rlat2 = lat2 * rad;
  const rlng2 = lng2 * rad;

  const dlng = rlng2 - rlng1;
  const Bx = Math.cos(rlat2) * Math.cos(dlng);
  const By = Math.cos(rlat2) * Math.sin(dlng);

  const lat3 = Math.atan2(Math.sin(rlat1) + Math.sin(rlat2),
            Math.sqrt(((Math.cos(rlat1) + Bx) * (Math.cos(rlat1) + Bx)) + (By * By)));
  const lng3 = rlng1 + Math.atan2(By, (Math.cos(rlat1) + Bx));

  const lat = (lat3 * 180) / Math.PI;
  const lng = (lng3 * 180) / Math.PI;
  return { lat2: lat, lng2: lng };
};

export { midpoint };
