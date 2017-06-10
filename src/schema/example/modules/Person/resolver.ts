export default {
  Query: {
    getPerson(_root, args, ctx) {
      return ctx.person.findPerson(args.id);
    },
    persons(_root, _args, ctx) {
      return ctx.person.db;
    },
    getPersonWithExtra() {
      const tempPerson = {
        id: '2',
        sex: 'female',
        name: 'lala'
      };
      return {
        speed: 1,
        person: tempPerson
      };
    },
  },
  Extra: {
    agility(root, args) {
      console.log('root: ', root);
      if (root.person.sex === 'female') return { value: 5 + args.height };
      return { value: 1 + args.height };
    },
  },
  Mutation: {
    addPerson(_root, args, ctx) {
      return ctx.person.addPerson(ctx.person.db, {
        id: Math.random().toString(16).substr(2),
        name: args.name,
        sex: args.sex
      });
    },
  },
};
