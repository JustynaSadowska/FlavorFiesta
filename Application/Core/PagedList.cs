using System;

namespace Application.Core;

public class PagedList<T, TCursor>
{
    public List<T> Items { get; set; } = [];
    public TCursor? NextCursor { get; set; }

    public double? CursorRating { get; set; } //dla sortowania po rating
}