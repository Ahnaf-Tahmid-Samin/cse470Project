import db from "../../db/db.js";
import { AuthenticationError } from "apollo-server-express";

export default {
  Query: {
    //SECTION user geting movies
    getavailablerentals: async (_, args, { user }) => {
      const { location } = args.userinput;
      try {
        if (!user) throw new AuthenticationError("Unauthorized");
        const rents = await db.vehicles.findMany({
          where: {
            AND: [
              {
                location: location,
              },
              {
                status: "Available",
              },
            ],
          },
        });
        //return if all OK
        return rents;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    bookrent: async (_, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthorized");
        let { vehicleid, pickup, destination, vehiclemodel } = args.userinput;
        const book = await db.rents.create({
          data: {
            username: user.username,
            vehicleid,
            pickup,
            destination,
            status: "Booked",
            vehiclemodel,
          },
        });

        return book;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    cancelrent: async (_, args, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthorized");
        let { id } = args.userinput;
        const cancel = await db.rents.update({
          where: {
            id: id,
          },
          data: {
            status: "Canceled",
          },
        });

        return cancel;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
