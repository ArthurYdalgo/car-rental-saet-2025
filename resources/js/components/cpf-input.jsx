import { useNonInitialEffect } from "@/hooks/use-non-initial-effect"
import { InputMask } from "@react-input/mask";
import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function CPFInput(
    {
        type = "text",
        className = "",
        required = false,
        disabled = false,
        showMask=true,
        mask = "___.___.___-__",
        replacement = { _: /\d/ },
        addGrayBackgroundIfDisabled = true,
        isFocused = false,
        ...props
    },
    ref
) {
    const input = ref ? ref : useRef();

    useNonInitialEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div
            className={
                "cursor-default relative w-full rounded-md border border-gray-300 bg-white pl-3 pr-3 py-2 text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5 " +
                (disabled && addGrayBackgroundIfDisabled
                    ? " disabled-gray "
                    : " ")
            }
        >
            {mask || replacement ? (
                <InputMask
                    mask={mask}
                    replacement={replacement}
                    {...props}
                    showMask={showMask}
                    className={
                        "p-0 boxshadow-none outline-none border-none w-full focus:border-none cursor-default relative text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5" +
                        (disabled && addGrayBackgroundIfDisabled
                            ? " disabled-gray "
                            : " ") +
                        className
                    }
                    type={type}
                    required={required}
                    disabled={disabled}
                    ref={input}
                />
            ) : (
                <input
                    {...props}
                    className={
                        "p-0 boxshadow-none outline-none border-none w-full focus:border-none cursor-default relative text-left focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition ease-in-out duration-150 sm:text-sm sm:leading-5" +
                        (disabled && addGrayBackgroundIfDisabled
                            ? " disabled-gray "
                            : " ") +
                        className
                    }
                    type={type}
                    required={required}
                    disabled={disabled}
                    ref={input}
                />
            )}
        </div>
    );
});
