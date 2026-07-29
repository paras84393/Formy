import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {

    const { i18n } = useTranslation();

    return (

        <select

            value={i18n.language}

            onChange={(e)=>i18n.changeLanguage(e.target.value)}

            className="px-3 py-2 border rounded-md"

        >

            <option value="en">

                English

            </option>

            <option value="hi">

                हिन्दी

            </option>
            <option value="fr">

                    Français

                </option>

                <option value="ar">

                    العربية

                </option>

        </select>

    );

}