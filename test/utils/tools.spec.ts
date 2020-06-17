import {handleMoney,add} from '../../src/utils/tools';
// import chai from 'chai';
describe('测试tools工具库',()=>{
    it('测试handleMoney 千分位工具',()=>{
        expect(handleMoney('10000')).to.be.equal('10,000.00');
    });

    it('测试add方法',()=>{
        expect(add(1,1)).to.be.equal(2);
    });
})