import PageContainer from "@/components/shared/page-container/page-container";
import { useState } from "react";

function Link({
  children,
  href,
  onClick,
  target,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  target?: string;
}) {
  if (onClick)
    return (
      <button
        onClick={onClick}
        className="text-brand hover:underline cursor-pointer"
      >
        {children}
      </button>
    );

  return (
    <a
      href={href}
      target={target}
      rel="noreferrer"
      className="text-brand hover:underline cursor-pointer"
    >
      {children}
    </a>
  );
}

function CypherEmail() {
  const [isCypher, setIsCypher] = useState(true);
  const domain = "gmail.com";
  const user = "q.grancher";

  if (isCypher) {
    return (
      <Link
        onClick={() => {
          setIsCypher(false);
        }}
      >
        email
      </Link>
    );
  } else {
    return <Link href={`mailto:${user}@${domain}`}>{`${user}@${domain}`}</Link>;
  }
}

export default function AboutPage() {
  return (
    <PageContainer horizontalMargin>
      <div className="container mx-auto py-8 max-w-xl text-white/80">
        <h1 className="text-5xl font-bold mb-10 relative text-white">
          <span className="absolute h-3 w-7 bg-brand -bottom-1 -left-2 -z-10"></span>
          About Harmonique
        </h1>

        <h2
          className="text-3xl font-semibold mb-8 border-b border-white pb-2 text-white"
          id="why"
        >
          Why create Harmonique?
        </h2>
        <p className="text-lg mb-6">
          Harmonique was born out of the intersection of my passions as both a
          developer and a DJ/Producer. The idea struck me when I discovered the
          wealth of data available through the{" "}
          <Link href="https://developer.spotify.com/documentation/web-api/reference/get-audio-features">
            Spotify API
          </Link>
          , offering deep insights into each song, including details like keys
          and tempo.
        </p>

        <p className="text-lg mb-6">
          As a music enthusiast, I frequently curate playlists on Spotify that
          reflect moments and moods in my life. These playlists are not just
          collections of songs; they're snapshots of inspiration and nostalgia.
        </p>

        <p className="text-lg mb-6">
          However, I often found myself wanting to seamlessly blend or mashup
          songs from my playlists, a process that required matching keys and
          tempos. While existing tools provided key information, they lacked
          integration with Spotify playlists. This gap inspired me to create
          Harmonique—a tool designed specifically for Spotify users like me, who
          value the personal curation of playlists.
        </p>

        <p className="text-lg mb-6">
          With Harmonique, you can effortlessly search and find songs within
          your Spotify playlists based on keys or tempo. Whether you're a DJ
          looking for the perfect acapella to sample or a music producer seeking
          harmonious blends, Harmonique is designed to help you find the songs.
        </p>

        <h2
          className="text-3xl font-semibold mb-8 border-b border-white pb-2 text-white"
          id="what"
        >
          What is Harmonique?
        </h2>
        <div className="mb-6">
          <p className="text-lg">
            This is a web application that leverages the{" "}
            <Link
              href="https://developer.spotify.com/documentation"
              target="_blank"
            >
              Spotify API
            </Link>{" "}
            to access and analyze your Spotify playlists. By connecting your
            Spotify account, you can search for songs within your playlists
            based on their keys or tempo. The search results are displayed in a
            user-friendly interface, allowing you to quickly find the songs you
            need for your creative projects.
          </p>

          <h2
            className="text-3xl font-semibold mb-8 mt-8 border-b border-white pb-2 text-white"
            id="privacy"
          >
            About privacy
          </h2>
          <p className="text-lg mb-4">
            Harmonique will request the following Spotify scopes from your
            account
          </p>
          <ul className="list-disc pl-6">
            <li>playlist-read-private</li>
            <li>user-read-email</li>
            <li>user-read-private</li>
            <li>user-top-read</li>
            <li>user-read-recently-played</li>
            <li>playlist-read-private</li>
          </ul>
          <p className="text-lg mt-4">
            These scopes allow the app to access user playlists, read user basic
            information, and read user listening history. Harmonique does not
            store any user data, and all data is fetched directly from the
            Spotify API.
          </p>
        </div>
        <h2 className="text-3xl font-semibold mb-8 border-b border-white pb-2 text-white">
          Feedback and support
        </h2>
        <p className="text-lg mb-6">
          Feedbacks are welcome, whether you have suggestions, feature requests,
          or bug reports. You can provide feedback directly on the{" "}
          <Link href="" target="_blank">
            GitHub repository
          </Link>{" "}
          or reach out via <CypherEmail />.
        </p>

        <p className="text-lg mb-4">Developed with 💜 by me.</p>
      </div>
    </PageContainer>
  );
}
