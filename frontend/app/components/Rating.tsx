type RatingProps = {
  value: number;
  text?: string;
};

function StarFull() {
  return (
    <svg className="h-3 w-3 fill-yellow-500" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.458a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.384-2.457a1 1 0 00-1.175 0l-3.384 2.457c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.098 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
    </svg>
  );
}

function StarEmpty() {
  return (
    <svg className="h-3 w-3 fill-gray-300" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.458a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.384-2.457a1 1 0 00-1.175 0l-3.384 2.457c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.098 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
    </svg>
  );
}

function StarHalf() {
  return (
    <div className="relative h-3 w-3">
      {/* étoile vide */}
      <svg className="absolute h-3 w-3 fill-gray-300" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.458a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.384-2.457a1 1 0 00-1.175 0l-3.384 2.457c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.098 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>

      {/* moitié remplie */}
      <div className="absolute overflow-hidden h-3 w-1/2">
        <svg className="h-3 w-3 fill-yellow-500" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.384 2.458a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.538 1.118l-3.384-2.457a1 1 0 00-1.175 0l-3.384 2.457c-.783.57-1.838-.196-1.538-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.098 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      </div>
    </div>
  );
}

export default function Rating({ value, text }: RatingProps) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center gap-0.5 leading-none">
      {stars.map((star) => {
        if (value >= star) return <StarFull key={star} />;
        if (value >= star - 0.5) return <StarHalf key={star} />;
        return <StarEmpty key={star} />;
      })}

      {text && <span className="ml-2 text-sm text-gray-600">{text}</span>}
    </div>
  );
}
