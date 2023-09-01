# On the Boat Business Requirements

# Boat Register
- All boats will be able to be searched by either the boat name, boat design, boat contact
- Selecting a boat will display an extended view of the boats details
- A boat can have a number of 'media' items associated with it. Photos to start with Youtube, etc. later.
- The boats sign on QR code will be part of the media
- There will be a link to a printable page of the QR code. This page should only have the QR code on it.
- The boats id will be used as a static url search parameter.

# Sign on.
- A crew member can sign on to being onboard a boat with approximately 1 click.
- A boat owner can see who is currently onboard
- A crew member can own multiple boats.
- A boat owner can see who is currently on the boat
- A boat owner or crew member can modify who is currently on the boat.
- When a boat owner or member is modifying who is on the boat, they will be presented with a list of crew members sorted by frequency of them being onboard. This will be know as the quick add list.
- The list of crew members to be quickly added to a boat can be modified to add or remove crew members from that list.
- A boat owner can leave a pen to participate in a race
- A boat owner can see who are the most regular crew members
- A boat owner can add other crew members as people able to modify the boat details
- When signing on to a boat, a crew member will have a display of their eligibility to compete in races at that location. Are they a full member, do they have a sail pass?

# Locations
- A boat will be given a location
- A location will be able to see which boats are on the water and have crew signed on.
- An administrator can add locations.
- A location will then have crew members that can administer the location
- The location can hold races
- A location can view who is currently on the water

# Racing
- A location administrator can create and maintain a regatta
- A regatta can have a number of heats.
- A heat is on a particular date.
- A heat has boats entered.
- A regatta has an entrant eligibility. For example, everyone onboard must be a member or have a sail pass.

# External Integration
- Access to the API is via location administrators
- A list of boats currently on the water will be made available
- A list of boats on the water at a given time will be available
- The boats entered into a regatta will be able to be queried to see who was onboard during a particular heat.
- A list of potential duplicate boats can be returned.

# Duplicate Checking
- A boat will be considered a duplicate if it has the same name, design, sail number, contact.
- A duplicate match will be scored based on the similarity of each field.
- A score will be the combined percentage of the four fields. If the name is a 100% match but no other fields match, it will be a 25% match.
- Duplication will be considered in a case-insensitive way.
