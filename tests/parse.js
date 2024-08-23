const { expect } = require('chai');
const { parse: parseArgs } = require('./../lib/parse');

describe('parseArgs', () => {
    let originalArgv;

    beforeEach(() => {
        // Store the original process.argv
        originalArgv = process.argv;
    });

    afterEach(() => {
        // Restore the original process.argv
        process.argv = originalArgv;
    });

    it('should correctly parse flags with values', () => {
        process.argv = ['node', 'script.js', '--name=John', '--age=30'];
        const result = parseArgs();
        expect(result).to.deep.equal({ name: 'John', age: '30' });
    });

    it('should correctly parse flags without values', () => {
        process.argv = ['node', 'script.js', '--verbose'];
        const result = parseArgs();
        expect(result).to.deep.equal({ verbose: undefined });
    });

    it('should correctly parse short flags', () => {
        process.argv = ['node', 'script.js', '-v'];
        const result = parseArgs();
        expect(result).to.deep.equal({ v: true });
    });

    it('should correctly parse flags with values separated by space', () => {
        process.argv = ['node', 'script.js', '--name', 'John', '--age', '30'];
        const result = parseArgs();
        expect(result).to.deep.equal({ name: 'John', age: '30' });
    });

    it('should correctly handle a mix of flags with and without values', () => {
        process.argv = ['node', 'script.js', '--name=John', '--verbose', '-a', '--age', '30'];
        const result = parseArgs();
        expect(result).to.deep.equal({ name: 'John', verbose: undefined, a: true, age: '30' });
    });
});
