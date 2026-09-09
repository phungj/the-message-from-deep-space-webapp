import { useEffect, useRef } from "react";

export default function TitleDialog() {
    const titleDialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        titleDialogRef.current?.showModal();
    }, []);

    return (
        <dialog ref={titleDialogRef} className="modal">
            <div className="modal-box max-w-3xl border border-base-300 bg-black">
                <h1 className="text-4xl font-bold">
                    THE MESSAGE FROM DEEP SPACE
                </h1>

                <h2 className="text-2xl font-bold mt-3">Inspired by the <a className="link" href="https://store.steampowered.com/app/4080030/The_Message_from_Deep_Space/">The Message from Deep Space</a></h2>

                <p className="mt-3 text-justify text-2xl">
                    This morning, May 13th, 1973, marks the beginning of the investigation of the world's first extraterrestrial contact.  Ten days ago, a meteor landed in Cape Espenberg, Alaska.  This meteor has an antenna, from which is has been broadcasting a radio transmission.  A 1.42 million kHz signal lasting 0.8066 seconds, pausing for just as long, and repeating.  Geoseismic stations detected the meteor's landing, and immediately after, a naval boat picked up the signal.  There is no doubt is it extraterrestrial.
                </p>
                <p className="mt-3 text-justify text-2xl whitespace-pre-line">
                    A translation team has been assembled as follows:

                </p>

                <ul className="list-disc list-inside mt-1 text-2xl text-left">
                    <li>Dr. Douglass Doppler - Materials Scientist and Team Lead</li>
                    <li>Dr. Alan Akers - Astronomer</li>
                    <li>Dr. Bryan Bautista - Computer Programmer</li>
                    <li>Dr. Carrie Collins - Linguist</li>
                    <li>Dr. Your Name - Translator</li>
                </ul>
                <p className="mt-3 text-justify text-2xl">
                    After hearing the frequency, Dr. Akers remarks that the number is the hydrogen line.  It is a universal constant describing the frequency of the radiation emitted when a hydrogen atom's electron changes spin: 1,420,405 kHz.  Now, it is up to you to figure out what to send back.
                </p>

                <form method="dialog">
                    <button className="btn btn-outline border-none rounded-none btn-primary mt-3 bg-white text-2xl text-black w-1/6 focus:outline-none focus:ring-0">
                        Begin
                    </button>
                </form>
            </div>

            <form method="dialog" className="modal-backdrop">
                <button />
            </form>
        </dialog>
    );
}