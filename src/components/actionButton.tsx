import { ArrowTopRightOnSquareIcon, CurrencyDollarIcon } from "@heroicons/react/24/outline"
import { ExternalDivisionLink } from "utils/next/anchor"
import { useElement } from "utils/react/element"
import { OppositeTextButtonRounded } from "./button"
import { HoverPopper } from "./modal"


export function ActionButton() {

    return <div className="flex justify-center gap-8">
        <FaucetLinkButton />
        <ExternalLinkButton />
        <GithubLinkButton />
    </div>
}

function ExternalLinkButton() {

    const linkPopper = useElement()

    return <>
        <HoverPopper target={linkPopper}>
            {"Go check the ip use"}
        </HoverPopper>
        <ExternalDivisionLink href="https://lunar-logs.vercel.app/">
            <OppositeTextButtonRounded
                onMouseEnter={linkPopper.use}
                onMouseLeave={linkPopper.unset}>
                <ArrowTopRightOnSquareIcon className="icon-md" />
            </OppositeTextButtonRounded>
        </ExternalDivisionLink>
    </>
}

function FaucetLinkButton() {

    const faucetPopper = useElement()

    return <>
        <HoverPopper target={faucetPopper}>
            {"Go get some Goerli"}
        </HoverPopper>
        <ExternalDivisionLink href="https://ethbrnofaucet.pages.dev/">
            <OppositeTextButtonRounded
                onMouseEnter={faucetPopper.use}
                onMouseLeave={faucetPopper.unset}>
                <CurrencyDollarIcon className="icon-md" />
            </OppositeTextButtonRounded>
        </ExternalDivisionLink>
    </>
}

function GithubLinkButton() {

    const githubPopper = useElement()

    return <>
        <HoverPopper target={githubPopper}>
            {"Go check our code"}
        </HoverPopper>
        <ExternalDivisionLink href="https://github.com/hazae41/ethbrno-wallet">
            <OppositeTextButtonRounded
                onMouseEnter={githubPopper.use}
                onMouseLeave={githubPopper.unset}>
                <img className="icon-md text-colored"
                    src="/github.svg" alt="github" />
            </OppositeTextButtonRounded>
        </ExternalDivisionLink>
    </>
}