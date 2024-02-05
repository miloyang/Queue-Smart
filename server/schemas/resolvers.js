//! Import dependencies
const { User, Venue } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require('apollo-server-express');

// Create resolver object
const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate("venue");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("venue");
    },
    // venues: async (parent, { username }) => {
    //   const params = username ? { username } : {};
    //   return Venue.find(params).sort({ createdAt: -1 });
    // },
    venue: async (parent, { venueID }) => {
      return Venue.findOne({ _id: venueId });
    },
    me: async (parent, args, context) => {
      console.log(context.user);
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("venue");
      }
      throw AuthenticationError;
    },
  },

  // Mutation resolvers
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    // add a venue
    addVenue: async (parent, { venueName }, context) => {
      // Check if the user is authenticated
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in to add a venue');
      }

      // Check if the user already has a venue associated with their account
      const user = await User.findById(context.user._id).populate('venue');
      if (user.venue) {
        throw new Error('You already have a venue associated with your account');
      }

      // Create the new venue
      const venue = await Venue.create({ venueName });

      // Update the user's venue field with the newly created venue
      await User.findByIdAndUpdate(context.user._id, { venue: venue._id });

      return venue;
    },
    // addVenue: async (parent, { venueName }, context) => {
    //   if (context.user) {
    //     const venue = await Venue.create({
    //       venueName,
    //     });

    //     await User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $addToSet: { venue: venue._id } }
    //     );

    //     return venue;
    //   }
    //   throw AuthenticationError;
    //   ("You need to be logged in!");
    // },
    // add a queue
    addQueue: async (
      parent,
      { venueId, customerName, customerMobile, partySize },
      context
    ) => {
      if (context.user) {
        return Venue.findOneAndUpdate(
          { _id: venueId },
          {
            $addToSet: {
              queues: { customerName, customerMobile, partySize },
            },
          },
          {
            new: true,
            runValidators: true,
          }
        );
      }
      throw AuthenticationError;
    },
    // remove the venue
    removeVenue: async (parent, { venueId }, context) => {
      if (context.user) {
        const venue = await Venue.findOneAndDelete({
          _id: venueId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { venue: venue._id } }
        );

        return venue;
      }
      throw AuthenticationError;
    },
    // remove a queue
    removeQueue: async (
      parent,
      { venueId, customerName, customerMobile, partySize },
      context
    ) => {
      if (context.user) {
        return Venue.findOneAndUpdate(
          { _id: venueId },
          {
            $pull: {
              queues: {
                _id: queueId,
                customerName,
                customerMobile,
                partySize
              },
            },
          },
          { new: true }
        );
      }
      throw AuthenticationError;
    },
  },
};

// Export resolvers
module.exports = resolvers;
