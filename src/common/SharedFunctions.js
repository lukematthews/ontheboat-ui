
export const ownsBoat = (profile, boat) =>{
    if (Object.keys(profile).length == 0) {
        return false;
    }
    let ownedBoatIndex = profile.ownedBoats.findIndex(b => b.id === boat.id);
    return ownedBoatIndex >= 0; 
}
