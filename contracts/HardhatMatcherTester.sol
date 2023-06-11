// SPDX-License-Identifier: GPL-3.0

pragma solidity 0.8.18;

contract HardhatMatcherTester {
    event BasicEvent();

    function callEvent() external {
        emit BasicEvent();
    }

    event EventWithArg(address hardhatMatcherTesterAddress);

    function callEventWithArg() external {
        emit EventWithArg(address(this));
    }

    event EventWithArgUnknowedValue(uint256);

    function callEventWithArgUnknowedValue() external {
        emit EventWithArgUnknowedValue(block.timestamp);
    }

    function reverted() external pure {
        revert();
    }

    function revertedWithMessage() external pure {
        revert('ERROR_MESSAGE');
    }

    function panicCode() external pure {
        assert(1 < 0);
    }

    error BasicError();

    function basicError() external pure {
        revert BasicError();
    }

    error ErrorWithArg(address hardhatMatcherTesterAddress);

    function errorWithArg() external view {
        revert ErrorWithArg(address(this));
    }
}
